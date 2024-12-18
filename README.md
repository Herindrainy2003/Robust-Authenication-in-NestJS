
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
