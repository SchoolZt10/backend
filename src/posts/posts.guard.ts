import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { postId } = request.params;

    const existPost = await this.prismaService.post.count({
      where: {
        OR: [{ id: postId }, { slug: postId }]
      }
    })

    if (existPost === 0) {
      throw new HttpException('Post not found', 404);
    }

    return true;
  }
}
