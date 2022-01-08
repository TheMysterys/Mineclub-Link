if (Test-Path "settings.js") {
    Write-Host "Settings file already exists. Moving it to settings.js.bak"
    Move-Item -Path settings.js -Destination settings.js.bak
}

Write-Host "Generating config file..."
npm start

$USER = Read-Host "Enter your username"
$PASS = Read-Host "Enter your password"
$URL = Read-Host "Enter the webhook URL you want to use"

Write-Host "Editing config file..."

(Get-Content settings.js).replace('name: ""', "name: `"$USER`"") | Set-Content settings.js
(Get-Content settings.js).replace('password: ""', "password: `"$PASS`"") | Set-Content settings.js
(Get-Content settings.js).replace('webhookURL: ""', "webhookURL: `"$URL`"") | Set-Content settings.js

Write-Host "Done"

Write-Host "For more settings see https://github.com/TheMysterys/Mineclub-Link/wiki/Settings-Explained"

