import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import 'dotenv/config.js'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "src/prisma/prisma.module";
@Module({
    imports: [JwtModule.register({
        secret: process.env.SECREET_KEY
    }),
    UsersModule,
    PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{}