#!/bin/bash
# update apt or respective package manager and download jq to traverse json using bash
sudo apt update && sudo apt install jq
#make the checkSSL.sh script executable
chmod +x checkSSL.sh