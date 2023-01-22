import { ConfigModule, ConfigService } from '@nestjs/config';
import entities from 'src/typeorm';
import { DataSource } from 'typeorm';

ConfigModule.forRoot(); // automatically load process.env

// used for transaction
export const dataSource = new DataSource({
  type: 'mongodb',
  host: process.env.MONGO_HOST, // "localhost",
  port: +process.env.MONGO_PORT,
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DB,
  entities,
  synchronize: false,
  logging: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log(' --------------------------------------------- ');
    console.log(' Connected with MongoDB Successfully!');
    console.log(' --------------------------------------------- ');
  })
  .catch((error) => console.log(error));
