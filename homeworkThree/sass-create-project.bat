@echo off
setlocal

if "%~1"=="" (
    echo Usage: %~nx0 ^<project-name^>
    exit /b 1
)

set "PROJECT=%~1"

:: make folders
mkdir "%PROJECT%"
cd "%PROJECT%"
mkdir css
mkdir scripts
mkdir scss

:: add files to folders
cd css
type nul > styles.css
cd ../scss
echo * { margin: 0; padding: 0; box-sizing: border-box; } html, body { height: 100%%; } h1, h2, h3, h4, h5, h6, p { margin-bottom: 16px; } >> structure.scss
echo @import "structure"; >> styles.scss
cd ../

(
    echo ^<!doctype html^>
    echo ^<html^>
    echo ^<head^>
    echo     ^<meta charset="utf-8" /^>
    echo     ^<meta http-equiv="X-UA-Compatible" content="IE=edge" /^>
    echo     ^<title^>^</title^>
    echo     ^<meta name="description" content="" /^>
    echo     ^<meta name="viewport" content="width=device-width, initial-scale=1" /^>
    echo     ^<link rel="stylesheet" href="css/styles.css" /^>
    echo ^</head^>
    echo ^<body^>
    echo     ^<script src="" async defer^>^</script^>
    echo ^</body^>
    echo ^</html^>
) > index.html

(
    echo {
    echo   "name": "startsass",
    echo   "version": "1.0.0",
    echo   "description": "This is a simple sass project",
    echo   "main": "index.js",
    echo   "scripts": {
    echo     "serve": "live-server",
    echo     "compile:sass": "sass scss/styles.scss css/styles.css -w --no-source-map"
    echo   },
    echo   "keywords": [],
    echo   "author": "Kelvin Ohaya",
    echo   "license": "ISC",
    echo   "type": "commonjs",
    echo   "devDependencies": {
    echo     "sass": "^^1.103.1",
    echo     "live-server": "^^1.2.2"
    echo   }
    echo }
) > package.json

npm i

endlocal
