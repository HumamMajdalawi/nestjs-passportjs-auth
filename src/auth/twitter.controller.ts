import {
  Controller,
  Get,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { TwitterAuthGuard } from './guards/twitter.auth.guard';
import { ReqUser } from './req.decorator';
import { Response } from 'express';

@Controller('auth')
export class TwitterController {
  constructor(private us: UserService) {}

  @Get('twitter')
  @UseGuards(TwitterAuthGuard)
  twitter() {
    throw new UnauthorizedException();
  }

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@ReqUser() socialUser: any, @Res() response: Response) {
    if (socialUser) {
      const user = await this.us.registerSocialUser(socialUser);
      if (user) {
        response.json({ status: true, statusCode: 200, data: {} });
        return;
      }
    }
    response.json({ status: false, statusCode: 400, data: {} });
  }
}
