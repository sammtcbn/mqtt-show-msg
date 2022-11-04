# mqtt-show-msg
mqtt-show-msg is a MQTT monitor tool written by go that scubscribe to topic you want to monitor and print out the messages. If the messages is in JSON format, mqtt-show-msg will pretty print out the messages.

I always use this tool to debug MQTT message while I am programming based on MQTT.

# Usage
```sh
mqtt-show-msg [option] ...
  option:
    -i [IP]        : MQTT Broker ip address
    -p [Port]      : MQTT Broker port
    -u [Username]  : MQTT Broker username
    -w [Password]  : MQTT Broker password
    -t [Topic]     : Topic to be monitored.
    -o             : Only show topic
```

# Example:
```sh
$ mqtt-show-msg -i test.mosquitto.org -t "#"
$ mqtt-show-msg -i 10.0.0.1 -p 8888 -u sam -w 12345 -t "/sensor/#"
```


# Author
Sam Lin (sammtcbn)

# License

[MIT](LICENSE)
