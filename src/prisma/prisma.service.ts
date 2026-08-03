import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    constructor(){
        const adapter = new PrismaMariaDb({
            host: 'localhost',
            user:'root',
            password:'admin',
            database: 'atrativaShore',
            port: 3306,
            connectionLimit: 5
        })

        super({ adapter })
    }
    
    async onModuleInit() {
        await this.$connect();
    }
    
    async onModuleDestroy() {
       await this.$disconnect();
    }
}
