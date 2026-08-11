import { Injectable } from '@nestjs/common';
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

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}
