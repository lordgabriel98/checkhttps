#!/bin/bash

json_size=`jq length govWeb.json`
array_size=$(($json_size-1))

for i in $(seq 0 $array_size)
do
  jq --arg i "$i" 'keys[$i|tonumber]' govWeb.json
done
