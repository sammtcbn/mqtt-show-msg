package main

import (
    "fmt"
    "bytes"
    "time"
    "encoding/json"
    "flag"
    "os"

    mqtt "github.com/eclipse/paho.mqtt.golang"
)


var (
    h bool
    ip string
    port string
    id string
    pw string
	topic string
	onlytopic bool
)

func init() {
    flag.BoolVar  (&h,    "h", false,                "show help")
    flag.StringVar(&ip,   "i", "test.mosquitto.org", "assign `ip`")
    flag.StringVar(&port, "p", "1883",               "assign port")
    flag.StringVar(&topic,"t", "#",                  "assign topic")
    flag.StringVar(&id,   "u", "",                   "assign username")
    flag.StringVar(&pw,   "w", "",                   "assign password")
	flag.BoolVar  (&onlytopic,  "o", false,          "only show topic")
}

var messagePubHandler mqtt.MessageHandler = func(client mqtt.Client, msg mqtt.Message) {
	t := time.Now()
	if onlytopic {
		fmt.Printf("%s %s\n", t.Format("2006-01-02 15:04:05"), msg.Topic())
	} else {
		var out bytes.Buffer
		json.Indent(&out, msg.Payload(), "", "    ")
		fmt.Printf("%s topic: %s\n%s\n\n", t.Format("2006-01-02 15:04:05"), msg.Topic(), string(out.Bytes()))
	}
}

var connectHandler mqtt.OnConnectHandler = func(client mqtt.Client) {
	fmt.Println("Connected")
}

var connectionLostHandler mqtt.ConnectionLostHandler = func(client mqtt.Client, err error) {
	fmt.Printf("Connection Lost: %s\n", err.Error())
}

func main() {
    flag.Parse()

	var broker = "tcp://" + ip + ":" + port

    if h {
        flag.Usage()
		os.Exit (0)
    }

/*
	fmt.Println ("broker =", broker)
	fmt.Println ("username =", id)
	fmt.Println ("password =", pw)
	fmt.Println ("topic =", topic)
	os.Exit (0)
*/

	options := mqtt.NewClientOptions()
	options.AddBroker(broker)
	options.SetClientID("mqtt-show-msg")

	if id != "" {
		options.SetUsername(id)
	}

	if pw != "" {
		options.SetPassword(pw)
	}

	options.SetDefaultPublishHandler(messagePubHandler)
	options.OnConnect = connectHandler
	options.OnConnectionLost = connectionLostHandler

	client := mqtt.NewClient(options)
	token := client.Connect()
	if token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	token = client.Subscribe(topic, 1, nil)
	token.Wait()
	fmt.Printf("Subscribed to topic %s\n", topic)

	for true {
		time.Sleep(time.Second)
	}

	fmt.Println("bye")
}
