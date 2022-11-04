#!/bin/bash
go mod init mqtt-show-msg
go get github.com/eclipse/paho.mqtt.golang
go build mqtt-show-msg.go
