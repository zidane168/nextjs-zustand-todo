import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const functionName: string = context.getHandler().name;
    if (
      functionName === 'register' ||
      functionName === 'login' ||
      functionName === 'checkAccessToken'
    ) {
      // just allow register
      return true;
    }

    return super.canActivate(context);
  }
}
