import { users_role } from "generated/prisma/client"

export class CreateUserDto {
  name!: string 
  age!: number
  role!: users_role
  email!:string
  password!:string
  birthAt!: Date
  createdAt!: Date
  updatedAt!: Date
}
