import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';


@Injectable()
export class AuthService {
 
  
  constructor(
    
    private userSerice : UserService ,

    private jwtService : JwtService ,

    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig : ConfigType<typeof refreshJwtConfig>

  ) {}

  // creation tous les logiques de notre authentification comme le mot de passe crypter . la verification de l'user
  async validateUser(email: string, password: string): Promise<User | null> {
   
    const user = await this.userSerice.findByemail(email); // recuperation de l'utilisateur

    if(!user) throw new NotFoundException("Verifie bien votre email ou votre mot de passe")

      const isPassword = await bcrypt.compare(password , user.password) //comparaison du mot de passe a l'aide de bcrypt.compare
     
      if(!isPassword) throw new NotFoundException("Verifie bien votre mot de passe");
     
      return user;
  }


  //pour gerer le token lors de l'authentification

  async login(userId : number){
     
    const payload : AuthJwtPayload =  {sub : userId}
   
     const token =  this.jwtService.sign(payload)
    
     const refreshToken = this.jwtService.sign(payload , this.refreshTokenConfig )
   
    return {
      id : userId,
      refreshToken , 
      token
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

