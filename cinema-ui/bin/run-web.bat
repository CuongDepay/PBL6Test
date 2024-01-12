@echo off
echo.
echo [INFO] Run web project using Vite command.
echo.

%~d0
cd %~dp0

cd ..
yarn dev

pause