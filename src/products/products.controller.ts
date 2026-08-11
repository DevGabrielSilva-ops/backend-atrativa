import { Body, Controller, Get, Patch, Post, Put } from "@nestjs/common";
import { ProductService } from "./products.service";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    async findProducts(){
        return this.productService.findProducts()
    }

    @Post('create')
    async createProduct(@Body() data: CreateProductDto){
        return this.productService.createProduct(data)
    }

    @Patch('update')
    async updateProduct(@Body() data: UpdateProductDto){
        return this.productService.updateQuantityProduct(data)
    }
}