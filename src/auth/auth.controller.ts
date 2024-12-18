import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local.guard';
import { AuthService } from './auth.service';
import { refreshJwtStrategy } from './strategy/refreshjwt.strategy';
import { RefreshjwtAuthGuard } from './guard/refreshjwt-auth/refreshjwt-auth.guard';

@Controller('auth')
export class AuthController {
  
  constructor (
    private readonly authService : AuthService
  ){}

  
   @UseGuards(LocalAuthGuard)
   @Post('login')
  async login(@Request() req) { 
    return this.authService.login(req.user.id)
  }


  @UseGuards(RefreshjwtAuthGuard)
  @Post("refresh")
 async  refresh(@Request() req){
  console.log(req.body)
    return this.authService.refreshToken(req.user.id)
  }
}
