import { registerAs } from "@nestjs/config";
import {  JwtSignOptions } from "@nestjs/jwt";

 //configuration de notre JWT 
export default registerAs('refresh-jwt' , () =>({
   
    secret : process.env.REFRESH_JWT_SECRET,  //le jwt secret qui a ete generer 

    expiresIn : process.env.REFRESH_JWT_EXPIRED //temps d'expiration recuperer dans notre variable d'environement
})
);