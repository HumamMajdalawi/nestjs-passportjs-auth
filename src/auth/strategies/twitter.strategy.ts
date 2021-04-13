import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(authService: AuthService) {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
    });
  }

  validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile,
    done: (error: any, user?: any) => void,
  ) {
    const user: any = {
      id: profile.id,
      nick: profile.username,
      name: profile.displayName,
    };
    if (profile.emails) {
      user.email = profile.emails.shift().value;
    }
    if (profile.photos) {
      user.avatar = profile.photos.shift().value;
    }

    done(null, user);
  }
}
