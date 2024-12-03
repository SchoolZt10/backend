import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FileManagerModule } from './services/file-manager/file-manager.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    FileManagerModule,
    AuthModule,
    CacheModule.registerAsync(RedisOptions),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
