import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FileManagerModule } from './services/file-manager/file-manager.module';

@Module({
  imports: [PostsModule, CommentsModule, FileManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
