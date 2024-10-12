import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { commentId } = request.params;

    const existPost = await this.prismaService.comment.count({
      where: {
        id: commentId
      }
    })

    if (existPost === 0) {
      throw new HttpException('Comment not found', 404);
    }

    return true;
  }
}
