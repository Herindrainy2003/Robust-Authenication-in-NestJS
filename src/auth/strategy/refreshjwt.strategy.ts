import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt"; 
import { Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express";


@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy , 'refresh-jwt'){
    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshjwtConfiguration : ConfigType<typeof refreshJwtConfig>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(), //cette methode recupere tous le auth header dans l'appel de l'api (exemple berer+ token)
            secretOrKey : refreshjwtConfiguration.secret,
            ignoreExpiration : false ,
            passReqToCallback : true
        })
    }

    validate(req: Request , payload : AuthJwtPayload){
        const refreshToken = req.get("authorization").replace("Bearer" , "").trim();
        const userId = payload.sub;
        return {id : payload.sub}
    } 
}