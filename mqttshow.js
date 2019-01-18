#!/usr/bin/env node

var broker = '127.0.0.1';
var topic = '#';
var mqtt = require ('mqtt');
var opt = {
    port:1883,
    username: '',
    password: '',
    clientId: 'nodejs'
};

if (process.argv.length != 4)
{
    console.log ("Usage:  program [mqtt broker ip] [topic]");
    process.exit(0);
}
broker = process.argv[2];
topic = process.argv[3];

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
