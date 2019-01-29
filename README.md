# mqtt-show-msg
mqtt-show-msg is a MQTT monitor tool written by node.js that scubscribe to topic you want to monitor and print out the messages. If the messages is in JSON format, mqtt-show-msg will pretty print out the messages.

I always use this tool to debug MQTT message while I am programming based on MQTT.

# Install
> $ git clone https://github.com/sammtcbn/mqtt-show-msg.git
> $ cd mqtt-show-msg
> $ sudo npm install -g

# Usage
> mqtt-show-msg [MQTT_BROKER_IP] [TOPIC]

Ex:
> mqtt-show-msg test.mosquitto.org '#'

# Todo
1. add parameter to only show topic, not messages

# Author
Sam Lin (sammtcbn)

# License

[MIT](LICENSE)
