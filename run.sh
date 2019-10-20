#!/bin/sh

npm run build

docker build -t kwashizaki/example-vue-cli:v1.0.0 -f ./DockerfileNoBuild .

