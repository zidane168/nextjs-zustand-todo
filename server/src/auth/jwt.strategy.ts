import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';


export interface IJWT {
  id: string, 
  iat: number, 
  exp: number
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // algorithms: ['RS256'],
      secretOrKey: jwtConstants.secret,
    });
  }


  async validate( input: IJWT ): Promise<any> {
 
    const user = await this.usersService.validate(input.id);
    if (!user) {
      throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
