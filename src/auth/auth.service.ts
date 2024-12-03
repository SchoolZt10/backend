import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { compare, hashSync } from 'bcrypt';
import { registerMail } from 'src/utils/mail/register';
import { UsersService } from 'src/users/users.service';
import { loginedMail } from 'src/utils/mail/logined';
import { CLIENT_URL } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) { }

  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('Користувача з такою поштою не знайдено', 400);
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new HttpException('Невірний пароль для цієї почти', 400);
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id, email: user.email }, {
        secret: process.env.JWT_SECRET
      }),
      message: 'Ви успішно війшли в систему',
    };
  }

  async signUp(jwtToken: string) {
    const payload: { name: string, email: string, password: string } = this.jwtService.verify(jwtToken, {
      secret: process.env.JWT_SECRET,
    });
    const { name, email, password } = payload;

    const userExists = await this.usersService.getUserByEmail(email)

    if (userExists) {
      throw new HttpException('Користувач з такою поштою вже існує', 400);
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    await this.prisma.profile.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      accessToken: this.jwtService.sign({ userId: user.id, email: user.email }, {
        secret: process.env.JWT_SECRET
      }),
      message: 'Ви успішно зареєструвались',
    };
  }

  async signUpSendMail({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const userExists = await this.usersService.getUserByEmail(email)

    if (userExists) {
      throw new HttpException('Користувач з такою поштою вже існує', 400);
    }

    const jwtToken = this.jwtService.sign({
      email,
      name,
      password: hashSync(password, 10)
    }, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    await registerMail(email, {
      url: `${CLIENT_URL}/auth/confirm-email?token=${jwtToken}`,
      name,
    });

    return {
      message: 'Посилання для підтвердження облікового запису було відправлено на вашу пошту',
    };
  }
}
