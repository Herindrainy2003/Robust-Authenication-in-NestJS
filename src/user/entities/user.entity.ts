import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id :number

    @Column()
    name : string

    @Column()
    email : string

    @Column()
    password : string

    @Column()
    hashedRefreshToken : string
    @BeforeInsert()
    async hashPassword(){
       return  this.password = await bcrypt.hash(this.password , 10)
    }
}
