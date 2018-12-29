#!/bin/sh
filepath=$(cd "`dirname "$0"`"; pwd)
cd $filepath
PID=`pgrep aria2c`
if [ -n "$PID" ]
then
    echo '{"ret":1,"data":{"status":1}}'
else
    echo '{"ret":1,"data":{"status":0}}'
fi


