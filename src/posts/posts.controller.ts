import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsGuard } from './posts.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() image: Express.Multer.File) {
    return this.postsService.create(createPostDto, image);
  }

  @Get()
  findAll() {
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
  findOne(@Param('postId') postId: string) {
    return this.postsService.findOne(postId).then(post => new PostEntity(post));
  }

  @Delete(':postId')
  @UseGuards(PostsGuard)
  remove(@Param('postId') postId: string) {
    return this.postsService.remove(postId);
  }


}
