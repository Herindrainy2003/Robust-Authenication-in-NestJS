import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt"; 
import { Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";


@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy , 'refresh-jwt'){
    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshjwtConfiguration : ConfigType<typeof refreshJwtConfig>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(), //cette methode recupere tous le auth header dans l'appel de l'api (exemple berer+ token)
            secretOrKey : refreshjwtConfiguration.secret,
        })
    }

    validate(payload : AuthJwtPayload){
        return {id : payload.sub}
    }
}