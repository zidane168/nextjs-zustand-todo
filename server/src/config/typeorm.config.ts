// import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import entities from 'src/typeorm';
import { DataSource } from 'typeorm';

// https://www.youtube.com/watch?v=1-MRmLsUrAo

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_DB,
      entities: entities, //: [__dirname + '/../entity/*.entity{.ts, .js}'],        // chỗ generate table!
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
    };
  },
};
