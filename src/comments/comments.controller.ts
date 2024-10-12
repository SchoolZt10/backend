import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto).then(
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
