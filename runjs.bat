@echo off

:: Start XAMPP (Control Panel + Apache + MySQL)
start "" "C:\xampp\xampp-control.exe"
timeout /t 5 >nul
"C:\xampp\xampp_start.exe"

cd /documents/mis_factory

:loop
node app.js
if %errorlevel% neq 0 (
    echo Error occurred. Restarting script...
)
timeout /t 2 >nul
goto loop