import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private usersService: UsersService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    let isAuth = false;

    if (authorization) {
      const token = authorization.split(' ')[1];
      const { id, email } = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET
      });

      const userExists = await this.usersService.getUserByEmail(email)

      if (userExists) {
        isAuth = true;
      }

      request.user = userExists;
    }

    if (!isAuth) {
      throw new HttpException('Користувач не авторизований', 401);
    }

    return true;
  }
}