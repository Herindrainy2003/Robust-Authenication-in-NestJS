import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

 //configuration de notre JWT 
export default registerAs('jwt' ,() : JwtModuleOptions =>({
    secret : process.env.JWT_SECRET,  //le jwt secret qui a ete generer 
    signOptions : {
        expiresIn : process.env.JWT_EXPIRED //temps d'expiration recuperer dans notre variable d'environement
    }
})
);