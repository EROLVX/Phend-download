@echo off
setlocal
title Phend portal - dev server
cd /d "%~dp0"

echo.
echo   =====================================
echo     Phend portal - starting up
echo   =====================================
echo.

REM --- Node.js must be installed ---------------------------------------
where node >nul 2>nul
if errorlevel 1 (
    echo   [ERROR] Node.js is not installed on this computer.
    echo.
    echo           1. Go to https://nodejs.org
    echo           2. Download the LTS version and install it
    echo           3. Run this file again
    echo.
    pause
    exit /b 1
)

for /f "delims=" %%v in ('node -v') do echo   Node %%v detected.

REM --- Force development mode. If NODE_ENV is left as production, npm
REM --- prunes the devDependencies that "next dev" needs, and the server
REM --- fails to start.
set "NODE_ENV=development"

REM --- First run only: install dependencies ------------------------------
if not exist "node_modules" (
    echo.
    echo   First run detected - installing dependencies.
    echo   This takes a few minutes. Please wait...
    echo.
    call npm install --include=dev
    if errorlevel 1 (
        echo.
        echo   [ERROR] Install failed. Read the red messages above.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo   Dependencies installed.
)

echo.
echo   ------------------------------------------------
echo     Open this address in your browser:
echo.
echo         http://localhost:3000
echo.
echo     Keep this window OPEN while you work.
echo     Press Ctrl+C here to stop the server.
echo   ------------------------------------------------
echo.

call npm run dev

echo.
echo   Server stopped.
pause
