import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    
    private userSerice : UserService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
   
    const user = await this.userSerice.findByemail(email);
    console.log("service" , user)

    if(!user) throw new NotFoundException("Verifie bien votre email ou votre mot de passe")

      const isPassword = await bcrypt.compare(password , user.password)
console.log(user.password)
      if(!isPassword) throw new NotFoundException("Verifie bien votre mot de passe");

      return user;
  }

 
}

