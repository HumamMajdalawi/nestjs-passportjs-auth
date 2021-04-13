import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUp } from './dto/sign-up.dto';
import { User } from '../user/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signUp: SignUp): Promise<User> {
    const user = await this.userService.create(signUp);
    delete user.password; // check exclude
    return user;
  }

  async login(email: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email } });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email:${email}`,
      );
    }
    delete user.password;

    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;
    try {
      user = await this.userService.findOne({ where: { email: payload.sub } });
    } catch (err) {
      throw new UnauthorizedException(
        `There is not any user with email: ${payload.sub}`,
      );
    }
    delete user.password;
    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
