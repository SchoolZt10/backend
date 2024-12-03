import { ClassSerializerInterceptor, Controller, Get, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserGuard } from 'src/auth/guards/user.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { UserEntity } from './entity/user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  @UseGuards(UserGuard)
  async getUsers(
    @GetUser() user: User
  ) {

    return new UserEntity(user);
  }
}
