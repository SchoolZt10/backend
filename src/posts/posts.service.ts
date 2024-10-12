import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma.service';
import { FileManagerService } from 'src/services/file-manager/file-manager.service';
import slugify from 'slugify';

@Injectable()
export class PostsService {
  constructor(
    private prismaService: PrismaService,
    private fileManagerService: FileManagerService
  ) { }

  private transformPost(post) {
    return { ...post, categoryName: post.Category?.name || null, Category: undefined };
  }

  async create(createPostDto: CreatePostDto, image: Express.Multer.File) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
    const slug = slugify((createPostDto.title.toLowerCase().trimStart().replace(/ /g, '-')) + '-' + randomDigits)

    const post = await this.prismaService.post.create({
      data: {
        ...createPostDto,
        slug,
      }
    })

    const fileName = post.id
    const fileType = image.mimetype.split('/')[1];
    const filePath = `/images/${fileName}.${fileType}`;

    await this.fileManagerService.writeFile(filePath, image.buffer);
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

  findAll() {
    return this.prismaService.post.findMany({
      include: {
        Category: true
      }
    }).then(posts => posts.map(this.transformPost));
  }

  findOne(id: string) {
    return this.prismaService.post.findUnique({
      where: {
        id: id,
      },
      include: {
        Category: true
      }
    }).then(this.transformPost);
  }

  remove(id: string) {
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
