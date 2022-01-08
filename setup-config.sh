#!/bin/sh
if [[ -f settings.js ]]; then
  echo "Settings file already exists. Moving it to settings.js.bak"
  mv settings.js settings.js.bak
fi

echo "Generating config file..."
npm start

printf "Enter your username: "
read USER

printf "Enter your password: "
read PASS

printf "Enter the webhook URL you want to use: "
read URL

echo "Editing config file..."

sed -i -e "s/name: \"\"/name: \"$USER\"/g" -e "s/password: \"\"/password: \"$PASS\"/g" -e "s/webhookURL: \"\"/webhookURL: \"$URL\"/g" settings.js

echo "Done"

echo "For more settings see https://github.com/TheMysterys/Mineclub-Link/wiki/Settings-Explained"
