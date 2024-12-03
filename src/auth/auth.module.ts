import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService, PrismaService],
})
export class AuthModule { }
