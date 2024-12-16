import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {

  constructor (
    private readonly userService : UserService
  ){}
   @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
