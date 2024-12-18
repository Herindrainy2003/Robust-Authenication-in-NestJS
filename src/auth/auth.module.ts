import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { refreshJwtStrategy } from './strategy/refreshjwt.strategy';

@Module({

  imports : [
  
    TypeOrmModule.forFeature([User]),
    
    JwtModule.registerAsync(jwtConfig.asProvider()), //appelle a notre jwt configuration 
    
    ConfigModule.forFeature(jwtConfig) ,
    ConfigModule.forFeature(refreshJwtConfig)
  ],

  controllers: [AuthController],
  providers: [AuthService ,LocalStrategy ,UserService ,JwtStrategy ,refreshJwtStrategy],
})

export class AuthModule {}
