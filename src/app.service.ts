import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user/dto/create-user.dto';

@Injectable()
export class AppService {

 
  getHello(): string {
    return 'Hello World!';
  }

}
