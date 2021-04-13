import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';

@Injectable()
export class TwitterAuthGuard extends AuthGuard('twitter') {
  handleRequest(err, user, info, context) {
    return user;
  }
}
