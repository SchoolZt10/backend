import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsGuard } from './posts.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostEntity } from './entities/post.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { UserGuard } from 'src/auth/guards/user.guard';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @GetUser() user: User,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.postsService.create(user.id, createPostDto, image);
  }

  @Patch(':postId')
  @UseGuards(PostsGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('postId') postId: string, @Body() updatePostDto: CreatePostDto, @UploadedFile() image: Express.Multer.File) {
    return this.postsService.update(postId, updatePostDto, image);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll().then(posts => posts.map(post => new PostEntity(post)));
  }

  @Get('/categories')
  async getCategories() {
    return this.postsService.getCategories();
  }

  @Get('/slug/:postSlug')
  async findBySlug(@Param('postSlug') postSlug: string) {
    return this.postsService.findBySlug(postSlug).then(post => new PostEntity(post));
  }

  @Get(':postId')
  @UseGuards(PostsGuard)
  async findOne(@Param('postId') postId: string) {
    return this.postsService.findOne(postId).then(post => new PostEntity(post));
  }

  @Delete(':postId')
  @UseGuards(PostsGuard, UserGuard)
  async remove(
    @GetUser() user: User,
    @Param('postId') postId: string
  ) {
    const post = await this.postsService.findOne(postId);

    if (post.userId !== user.id) {
      throw new Error('Unauthorized');
    }

    return this.postsService.remove(postId);
  }
}
