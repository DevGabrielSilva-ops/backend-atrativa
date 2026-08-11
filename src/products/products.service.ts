import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService){}

    async findProducts(){
        return this.prisma.products.findMany()
    }

    async createProduct(data: CreateProductDto){
        return this.prisma.products.create({
            data: data
        })
    }

    async findByName(productName:string){
        return await this.prisma.products.findFirst({
            where: {
                name:productName
            }
        })
    }

    async updateQuantityProduct({productName, qtd}: UpdateProductDto){

        const product = await this.findByName(productName)

        if(!product){
            throw new ForbiddenException("Product is not valid")
        }

        const id = Number(product?.id)


       return this.prisma.products.update({
            where: {id},
            data: {qtd:qtd}
        })

    }
}