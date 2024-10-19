#!/bin/bash

json_size=`jq length govWeb.json`
array_size=$(($json_size-1))

for i in $(seq 0 $array_size)
do
  website=$(jq --arg i "$i" 'keys[$i|tonumber]' govWeb.json)
  website=$(echo "$website" | xargs)
  url=$(jq --arg website "$website" '.[$website]' govWeb.json)
  url="$url" 
  echo "Department: $website"
  port=443
  url=$(echo "$url" | awk '{gsub(/"/, ""); print}')
  timeout 5 openssl s_client -connect $url:443 | grep Verification
  echo $url
done
