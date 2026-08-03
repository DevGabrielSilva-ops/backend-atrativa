import { Role, Prisma, Adress } from "generated/prisma/client"

export class CreateUserDto {
  name!: string 
  age!: number
  role!: Role
  address!: Adress
  birthAt!: Date
  createdAt!: Date
  updatedAt!: Date
}
