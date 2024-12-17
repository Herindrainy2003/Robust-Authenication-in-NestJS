import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

 //configuration de notre JWT
export default registerAs('jwt' ,() : JwtModuleOptions =>({
    secret : process.env.JWT_SECRET, 
    signOptions : {
        expiresIn : process.env.JWT_EXPIRED
    }
})
);