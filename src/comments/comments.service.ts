import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
  ) { }

  create(userId: number, createCommentDto: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: {
        ...createCommentDto,
        userId: userId
      }
    })
  }

  async findAll(postId: string) {
    return this.prismaService.comment.findMany({
      where: {
        postId: postId
      },
      include: {
        user: true
      }
    });
  }

  findOne(id: string) {
    return this.prismaService.comment.findUnique({
      where: {
        id: id
      }
    })
  }

  remove(id: string) {
    return this.prismaService.comment.delete({
      where: {
        id: id
      }
    })
  }
}
