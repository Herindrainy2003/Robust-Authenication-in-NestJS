import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guard/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  
  constructor (
    private readonly authService : AuthService
  ){}
   @UseGuards(LocalAuthGuard)
   @Post('login')
  async login(@Request() req) {
    //on genere la token avec authService qui utilise le JWT.sign(l'id d'user)
    const token =  await this.authService.login(req.user.id)
    
    return {id : req.user.id,token};
  }
}
