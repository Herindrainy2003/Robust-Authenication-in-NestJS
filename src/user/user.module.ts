import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';

@Module({
  imports : [
    ConfigModule.forFeature(refreshJwtConfig), //appelle  a notre refresh token 
    TypeOrmModule.forFeature([User])] ,

  controllers: [UserController],
  providers: [UserService , AuthService ,JwtService],
})
export class UserModule {}
