function Write-Info {
    param (
        $text
    )

    Write-Host -ForegroundColor Cyan "[INFO] $text"
}

function Check-Dep {
    param (
        $dep
    )
    
    Write-Host -NoNewLine "Checking for $dep... "
    try {
        Invoke-Expression "$dep --version" | Out-Null
        Write-Host -ForegroundColor Green "OK"
    } catch [System.Management.Automation.CommandNotFoundException] {
        Write-Host -ForegroundColor Red "ERR"
        Write-Error -Message "
        $dep not found quitting.
        See https://github.com/TheMysterys/Mineclub-Link/wiki/Installing-NodeJS-and-Git on how to install node.js and git.
        "
        Exit 1
    }
}

function Set-Config {
    param (
        $old,
        $new
    )

    (Get-Content settings.js).replace($old, $new) | Set-Content settings.js
}

Write-Host -ForegroundColor Yellow "
███╗   ███╗██╗███╗   ██╗███████╗ ██████╗██╗     ██╗   ██╗██████╗       ██╗     ██╗███╗   ██╗██╗  ██╗
████╗ ████║██║████╗  ██║██╔════╝██╔════╝██║     ██║   ██║██╔══██╗      ██║     ██║████╗  ██║██║ ██╔╝
██╔████╔██║██║██╔██╗ ██║█████╗  ██║     ██║     ██║   ██║██████╔╝█████╗██║     ██║██╔██╗ ██║█████╔╝ 
██║╚██╔╝██║██║██║╚██╗██║██╔══╝  ██║     ██║     ██║   ██║██╔══██╗╚════╝██║     ██║██║╚██╗██║██╔═██╗ 
██║ ╚═╝ ██║██║██║ ╚████║███████╗╚██████╗███████╗╚██████╔╝██████╔╝      ███████╗██║██║ ╚████║██║  ██╗
╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝ ╚═════╝╚══════╝ ╚═════╝ ╚═════╝       ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
"

# Check if already installed
if (Test-Path $HOME/Mineclub-Link) {
    Write-Error -Message "$HOME/Mineclub-Link already exists!"
    Exit 1
}

# Check for dependencies
Check-Dep -dep "git"
Check-Dep -dep "node"
Check-Dep -dep "npm"

# Prompt the user
Write-Info "Installation ready."
$confirmation = Read-Host "Install? [Y/n]"
if ($confirmation -eq 'n') {exit}

# Clone into home directory
cd $HOME
Write-Info -text "Cloning repository"
git clone "https://github.com/TheMysterys/Mineclub-Link.git"

cd Mineclub-Link

# Setup Mineclub-Link
Write-Info "Installing node dependencies"
npm i
Write-Info "Creating config file skeleton"
npm run start | Out-Null

Write-Host "This bot needs your credentials to work:"
$USER = Read-Host "> username"
$PASS = Read-Host "> password"

Write-Host "This bot also requires a webhook:"
$URL = Read-Host "> webhook"

Write-Host "Editing config file..."

Set-Config -old 'name: ""' -new "name: `"$USER`""
Set-Config -old 'password: ""' -new "password: `"$PASS`""
Set-Config -old 'webhookURL: ""' -new "webhookURL: `"$URL`""

Write-Info "Finished editing config."

Write-Host -ForegroundColor Yellow "
For more settings see https://github.com/TheMysterys/Mineclub-Link/wiki/Settings-Explained

The bot has been installed to $HOME/Mineclub-Link and is ready to use now.
If you encounter any errors open an GitHub issue or ask the support here https://mysterybots.com/discord
"

$confirmation = Read-Host "Start the bot right now? [Y/n]"
if ($confirmation -eq 'n') {exit}
npm run start