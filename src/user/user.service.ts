import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private userRepository : Repository <User>
  
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user)
  }

  async findByemail(email : string){
    return this.userRepository.findOneBy({email})
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {

    return this.userRepository.findOne({
       where : {id} ,
       select : ["email"]
    })
  }
  
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


//
  async updateHashedRefreahToken(userId:number , hashedRefreshToken :string) {
    return await this.userRepository.update({ id : userId} , {hashedRefreshToken})
  

  }
}
