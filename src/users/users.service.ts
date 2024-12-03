import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
  ) { }

  async getUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
