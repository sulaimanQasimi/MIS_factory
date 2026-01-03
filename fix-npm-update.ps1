# Fix npm update EBUSY error
Write-Host "Stopping Node.js processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -eq "node" -and $_.Path -like "*nodejs*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "Removing locked vxx directory..." -ForegroundColor Yellow
if (Test-Path "node_modules\vxx") {
    Remove-Item -Path "node_modules\vxx" -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Removing node_modules and package-lock.json..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
}

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "Done!" -ForegroundColor Green
