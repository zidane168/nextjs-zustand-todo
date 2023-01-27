import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor() {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '500s', // '100s',
        //algorithm: 'RS256'
      },
      //  verifyOptions: { algorithms: ['RS256'] },

      // signOptions: {
      //     expiresIn: appConfig.jwt.expireIn,
      //     algorithm: 'RS256'
      // },
      // privateKey: appConfig.jwt.private,
      // publicKey: appConfig.jwt.public,
      // verifyOptions: { algorithms: ['RS256'] },
    };
  }
}
