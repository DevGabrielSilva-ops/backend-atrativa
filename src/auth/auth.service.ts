import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly user:UsersService,
        private readonly Jwt: JwtService,
    ){}

   async login({email,password}:LoginDto){

       const Isemail = await this.user.findByEmail(email)

       if(!Isemail){
        throw new ForbiddenException('email is not valid')
       }

       const IsPassword = bcrypt.compare(password, Isemail.password)

       if(!IsPassword){
        throw new ForbiddenException('password is not valid')
       }

       const token = await this.Jwt.sign({
            Isemail
       }, {
        expiresIn: 3600

       })
        return token
    }

    async register({email,...data}: CreateUserDto) {
        
        const IsUser = await this.user.findByEmail(email)

        if(IsUser){
            throw new ConflictException('Email alwared use')
        }

        this.user.create({email,...data})

        const token = this.Jwt.sign({
            email,
            data
        }, {
            expiresIn: 3600
        })

        return token

    }
}