#!/usr/bin/env node

const minimist = require('minimist');

let args = minimist(process.argv.slice(2), {
    string: ["ip"],
    string: ["port"],
    string: ["username"],
    string: ["password"],
    string: ["topic"],
});

var broker = '127.0.0.1';
var topic = '#';
var mqtt = require ('mqtt');
var opt = {
    port:1883,
    clientId: 'nodejs'
};

if (typeof args.ip !== 'undefined')
    broker = args.ip;

if (typeof args.port !== 'undefined')
    opt.port = args.port;

if (typeof args.username !== 'undefined')
    opt.username = args.username;

if (typeof args.password !== 'undefined')
    opt.password = args.password;

if (typeof args.topic !== 'undefined')
    topic = args.topic;

/* debug
console.log ('broker  : ' + broker);
console.log ('port    : ' + opt.port);
console.log ('username: ' + opt.username);
console.log ('password: ' + opt.password);
console.log ('topic   : ' + topic);
*/

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
}

function getMyTime() {
    var d = new Date();
    var e = convertUTCDateToLocalDate(d);
    return e.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

var client = mqtt.connect('mqtt://' + broker, opt);
client.on ('connect', function () {
    var currtime = getMyTime();
    console.log (currtime + ' broker ' + broker + ' connected');
    console.log (' ');
    client.subscribe (topic);
});

client.on ('close', function () {
    var currtime = getMyTime();
    console.log (currtime + ' broker ' + broker + ' closed');
    console.log (' ');
});

client.on ('reconnect', function () {
    var currtime = getMyTime();
    console.log (currtime + ' broker ' + broker + ' reconnect');
    console.log (' ');
});

client.on ('message', function (topic, msg) {
    var currtime = getMyTime();
    console.log (currtime + ' topic: ' + '\x1b[36m' + topic + '\x1b[0m');

    if (isJSON (msg.toString()))
    {
        jsonPretty = JSON.stringify(JSON.parse(msg),null,2);
        console.log (jsonPretty);
    }
    else
    {
        console.log (msg.toString());
    }

    console.log (' ');
});
