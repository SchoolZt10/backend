import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { UserGuard } from 'src/auth/guards/user.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(UserGuard)
  async create(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentsService.create(user.id, createCommentDto).then(
      (comment) => new CommentEntity(comment)
    );
  }

  @Get(':postId')
  async findAll(
    @Param('postId') postId: string
  ) {
    return this.commentsService.findAll(postId)
      .then(comments => comments.map(comment => new CommentEntity(comment)));
  }

  @Get(':commnetId')
  async findOne(@Param('commnetId') commnetId: string) {
    return this.commentsService.findOne(commnetId);
  }

  @Delete(':commnetId')
  async remove(@Param('commnetId') commnetId: string) {
    return this.commentsService.remove(commnetId);
  }
}
