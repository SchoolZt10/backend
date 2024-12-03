import { Body, Controller, Get, HttpException, Param, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { loginedMail } from 'src/utils/mail/logined';
import { CloudflareCaptcha } from 'src/utils/captcha/cloudflare';
import { getIp } from 'src/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Req() request: Request,
    @Body() registerDto: RegisterDto
  ) {
    const ip = getIp(request)

    if (!await CloudflareCaptcha.verifyCaptcha(registerDto.captchaToken, ip)) {
      throw new HttpException('Ошибка капчи', 403);
    }

    return this.authService.signUpSendMail(registerDto);
  }

  @Get('confirm/:token')
  async confirm(@Param('token') token: string) {
    return this.authService.signUp(token);
  }

  @Post('login')
  async login(
    @Req() request: Request,
    @Body() loginDto: LoginDto
  ) {
    const userAgent = request.headers['user-agent'];
    const ip = getIp(request);

    const response = await this.authService.signIn(loginDto);

    await loginedMail(loginDto.email, {
      name: loginDto.email,
      ip,
      userAgent
    })

    return response;
  }
}
