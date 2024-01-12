@echo off
echo.
echo [INFO] Package the Web project and generate a dist file.
echo.

%~d0
cd %~dp0

cd ..
yarn build:prod

pause