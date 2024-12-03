import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, UsersService],
})
export class CommentsModule { }
