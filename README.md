# mqtt-show-msg
mqtt-show-msg is a MQTT monitor tool written by node.js that scubscribe to topic you want to monitor and print out the messages. If the messages is in JSON format, mqtt-show-msg will pretty print out the messages.

I always use this tool to debug MQTT message while I am programming based on MQTT.

# Install
```sh
$ git clone https://github.com/sammtcbn/mqtt-show-msg.git
$ cd mqtt-show-msg
$ sudo npm install -g
```

# Usage
```sh
mqtt-show-msg [option] ...
  option:
    --ip        : MQTT Broker ip address
    --port      : MQTT Broker port
    --username  : MQTT Broker username
    --password  : MQTT Broker password
    --topic     : topic to be monitored.
```

# Example:
```sh
$ mqtt-show-msg --ip=test.mosquitto.org --topic="#"
$ mqtt-show-msg --ip=10.0.0.1 --port:8888 --username=sam --password=12345 --topic="/sensor/#"
```

# Todo
1. add parameter to only show topic, not messages

# Author
Sam Lin (sammtcbn)

# License

[MIT](LICENSE)
