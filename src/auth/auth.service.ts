import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {
 
  
  constructor(
    
    private userService : UserService ,

    private jwtService : JwtService ,

    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig : ConfigType<typeof refreshJwtConfig>

  ) {}

  // creation tous les logiques de notre authentification comme le mot de passe crypter . la verification de l'user
  async validateUser(email: string, password: string): Promise<User | null> {
   
    const user = await this.userService.findByemail(email); // recuperation de l'utilisateur

    if(!user) throw new NotFoundException("Verifie bien votre email ou votre mot de passe")

      const isPassword = await bcrypt.compare(password , user.password) //comparaison du mot de passe a l'aide de bcrypt.compare
     
      if(!isPassword) throw new NotFoundException("Verifie bien votre mot de passe");
     
      return user;
  }


  //pour gerer le token lors de l'authentification

  async login(userId : number){
     
   
    const {accesToken , refreshToken} = await this.genereteToken(userId)
    
    //hasher notre Token en utilisant  argon2
    const hashedRefreshToken = await argon2.hash(refreshToken)

    await this.userService.updateHashedRefreahToken(userId , hashedRefreshToken)

    return {
      id : userId,
      accesToken,
      refreshToken
    }
  }
 
  //fonction pour generer le token

  async genereteToken(userId : number){
    const payload : AuthJwtPayload = {sub : userId};
    const [accesToken , refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload , this.refreshTokenConfig )
    ]); 
    return {
      accesToken , 
      refreshToken
    }
  } 


  async refreshToken(userId: number) {
    const payload : AuthJwtPayload =  {sub : userId}
    const token =  this.jwtService.sign(payload)
    return {
      id : userId, 
      token
    }
  }
}

