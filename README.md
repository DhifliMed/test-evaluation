
# **TestEvaluation**

## Description
this project is An Api to Create Surveys and answer them

## Quick start
- Run <<***npm i***>>
- Run <<***npm run start***>>
- Go to your browser http://localhost:1337
## Libs
The project is mainly created with Sails JS @1.5.2 and depends on nodeJS @ 16.14
on the second level, I used also jsonwebtoken@8.5.1 library for javascript

## Directory Architecture
The project is devided into three main sections
- Auth
- Survey
- Answer

### Install
the dependencies of this project are written in package.json
to install them run << ***npm i*** >>

### Development and production
to run this project in development mode run << ***npm run start*** >>

after setting a database url at << ***config/production*** >> 
( 
for exemple :
adapter: "sails-postgresql",
url: "postgres://postgres:postgres@127.0.0.1:5432/proddatabase",
)
you can run this project in development mode run << ***npm run prod*** >> 
project will run on port ***1337*** by default
