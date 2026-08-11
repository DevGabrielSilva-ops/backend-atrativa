import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create({
    age,
    birthAt,
    createdAt,
    email,
    name,
    password,
    role,
    updatedAt,
  }: CreateUserDto) {
    const senhaHash = await bcrypt.hash(password,15);
    

    return this.prisma.users.create({
      data: {
        age,
        birthAt,
        createdAt,
        email,
        name,
        role,
        updatedAt,
        password: senhaHash,
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async findByEmail(email:string){
      return await this.prisma.users.findFirst({
        where: {
          email: email
        }
      })
  }

  async forgetPassword(email:string,password,Newpassword:string){
      
      const Hashedpassword = await bcrypt.hash(Newpassword,15)
    
      const User = await this.findByEmail(email)

      if(!User){
        throw new ConflictException("user is not exist")
      }

      const passworIsValid = await bcrypt.compare(password,User.password)
      
      if(!passworIsValid){
        throw new ForbiddenException("password not valid")
      }

      const id = Number(User?.id)
      
      await this.prisma.users.update({
        where: {id},
        data: {
          password: Hashedpassword
        }
      })

      return {message:'Password updated sucess'}
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}
