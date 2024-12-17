import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';


@Injectable()
export class AuthService {
  constructor(
    
    private userSerice : UserService ,

    private jwtService : JwtService

  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
   
    const user = await this.userSerice.findByemail(email);
   
    if(!user) throw new NotFoundException("Verifie bien votre email ou votre mot de passe")

      const isPassword = await bcrypt.compare(password , user.password)

      if(!isPassword) throw new NotFoundException("Verifie bien votre mot de passe");

      return user;
  }


  //pour gerer le token lors de l'authentification

  async login(userId : number){
    const payload : AuthJwtPayload =  {sub : userId}
    console.log("payload" , payload)
   return  this.jwtService.sign(payload)
  }
 
}

