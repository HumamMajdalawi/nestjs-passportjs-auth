import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      // calling super.logIn(request) to establish a session.
      await super.logIn(request);
    }

    return result;
  }
}
