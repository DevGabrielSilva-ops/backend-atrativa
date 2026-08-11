import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    
    @Post()
    async login(@Body() data:LoginDto) {
        return await this.authService.login(data);
    }

    @Post('register')
    async register(@Body() data:CreateUserDto){
        return await this.authService.register(data)
    }

}