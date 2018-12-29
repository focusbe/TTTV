#!/bin/sh
filepath=$(cd "`dirname "$0"`"; pwd)
cd $filepath
PID=`pgrep aria2c`
if [ -n "$PID" ]
then
    kill $PID
    sleep 3
    source $filepath/startAria2&
else
    echo '{"ret":2,"msg":"no server"}';
fi


