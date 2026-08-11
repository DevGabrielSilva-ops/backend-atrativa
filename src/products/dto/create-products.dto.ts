import { type_product } from "generated/prisma/enums"


export class CreateProductDto {
  bar_code!: string
  name!: string
  qtd!: number
  price!: number
  type!: type_product
}