import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    
    //configuration de notre JWT
    JwtModule.register({
      secret  : "",
      signOptions : {
        expiresIn : "1d" //le temps d'expiration de notre token
      }
    })
    , PassportModule
  ] ,
  controllers: [AuthController],
  providers: [AuthService ,LocalStrategy ,UserService],
})
export class AuthModule {}
