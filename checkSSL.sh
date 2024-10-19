#!/bin/bash

websites=`cat govWeb.json | jq`

echo $websites
