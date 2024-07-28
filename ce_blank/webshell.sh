#!/bin/bash

# http://localhost:7681/
# 守护进程配置 /usr/local/etc/supervisor.d/my_conf.ini
echo "run $1 $2"

if [[ "$1" == "top" ]]; then
$1
elif [[ "$1" == "ai" ]]; then
# open -a "Google Chrome" https://chatgpt.com/
fi

/bin/zsh

exit 0

# # 无限循环，持续显示进程信息
# while true; do
#   clear
#   ps aux | awk '{print $2, $3, $11}' | sort -k2 -nr | head -n 10
#   sleep 2
# done
