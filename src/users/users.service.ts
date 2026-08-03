import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}
 create(createUserDto: CreateUserDto) {
  
  
  const { address, ...userData } = createUserDto;

  return this.prisma.users.create({
    data: {
      ...userData,
      
      
      address: {
        create: {
          street: address.street,
          numberHouse: address.numberHouse,
          complement: address.complement,
          streetFullName: address.streetFullName,
        }
      }
    }
  });
}

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {id}
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {

    const { address, ...userData } = updateUserDto;

    return this.prisma.users.update({
      where: {id},
      data: {
      ...userData,
      
      
      address: {
        create: {
          street: address!.street,
          numberHouse: address!.numberHouse,
          complement: address!.complement,
          streetFullName: address!.streetFullName,
        }
      }
    }
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({where: {id}});
  }
}
