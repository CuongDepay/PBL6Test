@echo off
echo.
echo [INFO] Install the Web project and generate the node_modules file.
echo.

%~d0
cd %~dp0

cd ..
yarn --registry=https://registry.npmmirror.com

pause