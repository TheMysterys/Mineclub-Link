#!/bin/sh

# ANSI sequences
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
CYAN='\033[36m'
CLEAR='\033[00m'

print_info() {
  printf "$CYAN[INFO]$CLEAR $1\n"
}

check_dependency() {
  printf "Checking for $1... "
  if ! command -v $1 >/dev/null
  then
    printf "$RED"
    printf "ERR\n\n"
    printf "$1 not found.\nSee https://github.com/TheMysterys/Mineclub-Link/wiki/Installing-NodeJS-and-Git on how to install node.js and git."
    exit 1
  else
    printf $GREEN
    printf "OK\n$CLEAR"
  fi
}

prompt() {
  while true; do
    read -p "$1" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
  done
}

printf $YELLOW
cat << EOF
███╗   ███╗██╗███╗   ██╗███████╗ ██████╗██╗     ██╗   ██╗██████╗       ██╗     ██╗███╗   ██╗██╗  ██╗
████╗ ████║██║████╗  ██║██╔════╝██╔════╝██║     ██║   ██║██╔══██╗      ██║     ██║████╗  ██║██║ ██╔╝
██╔████╔██║██║██╔██╗ ██║█████╗  ██║     ██║     ██║   ██║██████╔╝█████╗██║     ██║██╔██╗ ██║█████╔╝
██║╚██╔╝██║██║██║╚██╗██║██╔══╝  ██║     ██║     ██║   ██║██╔══██╗╚════╝██║     ██║██║╚██╗██║██╔═██╗
██║ ╚═╝ ██║██║██║ ╚████║███████╗╚██████╗███████╗╚██████╔╝██████╔╝      ███████╗██║██║ ╚████║██║  ██╗
╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝ ╚═════╝╚══════╝ ╚═════╝ ╚═════╝       ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝

EOF
printf $CLEAR

check_dependency git
check_dependency node
check_dependency npm

printf "\n"
print_info "Installation ready."
prompt "Install? [y/n]"

cd ~
print_info "Cloning repository"
git clone "https://github.com/TheMysterys/Mineclub-Link.git"

cd Mineclub-Link

print_info "Install node dependencies"
npm i
print_info "Creating config file skeleton"
npm run start >/dev/null

printf "This bot needs your credentials to work:\n"
read -p "> username: " USERNAME
read -p "> password: " PASSWORD

printf "\nThis bot also requries a webhook:\n"
read -p "> webhook: " URL

print_info "Editing config file"
sed -i -e "s/name: \"\"/name: \"$USERNAME\"/g" -e "s/password: \"\"/password: \"$PASSWORD\"/g" -e "s/webhookURL: \"\"/webhookURL: \"$URL\"/g" settings.js

printf "$YELLOW"
cat << EOF
For more settings see https://github.com/TheMysterys/Mineclub-Link/wiki/Settings-Explained

The bot has been installed to $HOME/Mineclub-Link and is ready to use now.
If you encounter any errors open an GitHub issue or ask the support here https://mysterybots.com/discord
EOF
printf "$CLEAR"

prompt "Start the bot right now? [y/n]"
npm run start
