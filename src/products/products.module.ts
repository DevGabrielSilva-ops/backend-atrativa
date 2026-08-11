import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";

@Module({
    imports: [PrismaModule],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})


export class ProductModule {}