import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma.service';
import { FileManagerService } from 'src/services/file-manager/file-manager.service';
import slugify from 'slugify';
import { Post } from '@prisma/client';
import { generateRandomDigits } from 'src/utils';
import { UpdatePostDto } from './dto/edit-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private prismaService: PrismaService,
    private fileManagerService: FileManagerService
  ) { }

  private transformPost(post) {
    return { ...post, categoryName: post.Category?.name || null, Category: undefined };
  }

  async saveImage(post: Post, image: Express.Multer.File) {
    const fileName = post.id
    const fileType = image.mimetype.split('/')[1];
    const filePath = `/images/${fileName}.${fileType}`;

    await this.fileManagerService.writeFile(filePath, image.buffer);

    return filePath;
  }

  async create(userId: number, createPostDto: CreatePostDto, image: Express.Multer.File) {

    const slug = slugify((createPostDto.title.toLowerCase().trimStart().replace(/ /g, '-')) + '-' + generateRandomDigits())

    const post = await this.prismaService.post.create({
      data: {
        ...createPostDto,
        slug,
        userId
      }
    })

    const filePath = await this.saveImage(post, image);
    post.image = filePath;

    await this.prismaService.post.update({
      where: {
        id: post.id
      },
      data: {
        image: filePath
      }
    })

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, image: Express.Multer.File) {
    const slug = slugify((updatePostDto.title.toLowerCase().trimStart().replace(/ /g, '-')) + '-' + generateRandomDigits())

    const updatedPost = await this.prismaService.post.update({
      where: {
        id: id
      },
      data: {
        ...updatePostDto,
        slug
      }
    })

    if (image) {
      const filePath = await this.saveImage(updatedPost, image);
      updatedPost.image = filePath;

      await this.prismaService.post.update({
        where: {
          id: updatedPost.id
        },
        data: {
          image: filePath
        }
      })
    }

    return updatedPost;
  }

  async findAll() {
    return this.prismaService.post.findMany({
      include: {
        Category: true
      }
    }).then(posts => posts.map(this.transformPost));
  }

  async findOne(id: string) {
    return this.prismaService.post.findUnique({
      where: {
        id: id,
      },
      include: {
        Category: true
      }
    }).then(this.transformPost);
  }

  async remove(id: string) {
    return this.prismaService.post.delete({
      where: {
        id: id,
      }
    })
  }

  async findBySlug(slug: string) {
    return this.prismaService.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        Category: true
      }
    }).then(this.transformPost);
  }

  async getCategories() {
    return this.prismaService.category.findMany();
  }
}
