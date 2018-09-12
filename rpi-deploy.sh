#!/bin/bash
yarn build

sudo docker build -f Dockerfile-rpi -t react-matic-rpi .

sudo docker stop reactmatic

sudo docker run -d -rm --name reactmatic -p 8080:3000 react-matic
