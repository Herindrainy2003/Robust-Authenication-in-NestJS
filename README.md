
## Description
* A robust Authentication using JWt , Guard.
* Acces Token 
* if the token is expired, we have already set up Refresh token

==> You can clone this repository and use in your project

## Tecno
- NestJs
- PostgreSQL
- TypeOrm
- Jwt

## Testing API

```bash 
# For add user (POST , with the JSON { "name" : "your name test" , "email" : "your email test" , "password" : "your password test"})
$ localhost:3000/user 

#For Login with body content the JSON { "name" : "your name test" , "password" : "your password test"}

$ localhost:3000/auth/login

#For select the profile GET  with  token generate by this request localhost:3000/auth/login

$ localhost:3000/user/profile

# if the token expired , use this request for the token refresh

$ localhost:3000/auth/refresh #it's generate the new token and using this refresh token in localhost:3000/auth/login (it's work!!!!!)

```

## Project setup

```bash
$ git clone https://github.com/Herindrainy2003/Robust-Authenication-in-NestJS.git
$ cd Robust-Authenication-in-NestJS
$ npm install
$ npm run start:dev
$ Your API is run in  localhost:3000  and follow all Testing API
```
## your .env file 

```bash


    - POSTGRES_HOST=your host
    - POSTGRES_PORT=your port
    - POSTGRES_USER= tour database
    - POSTGRES_PASSWORD=your pwd
    - POSTGRES_DB= your db


    - JWT_SECRET = f064d455ba37fddf5659ee4b16e75da3b4cc920ee4bbb0b0f6cdd17574e62a38fab1f73bd5b86a4cb90b39478f995d6e545960f03d2602f67bcdbbe26e9a5120 it's in sample example
    - JWT_EXPIRED = 2min it's in sample example



    - REFRESH_JWT_SECRET = 34e05e0b41452aa74cfcdacb672660d869dcd2b6fa36245d4fc4f4735c70b839 it's in sample example
    - REFRESH_JWT_EXPIRED = 1d it's in sample example
```