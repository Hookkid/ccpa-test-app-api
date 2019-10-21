import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME && process.env.RDS_HOSTNAME.substring(0, process.env.RDS_HOSTNAME.length-1) || dbConfig.host,
  port: process.env.RDS_PORT && process.env.RDS_PORT.substring(0, process.env.RDS_PORT.length-1) || dbConfig.port,
  username: process.env.RDS_USERNAME && process.env.RDS_USERNAME.substring(0, process.env.RDS_USERNAME.length-1) || dbConfig.username,
  password: process.env.RDS_PASSWORD && process.env.RDS_PASSWORD.substring(0, process.env.RDS_PASSWORD.length-1) || dbConfig.password,
  database: process.env.RDS_DB_NAME && process.env.RDS_DB_NAME.substring(0, process.env.RDS_DB_NAME.length-1) || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC && process.env.TYPEORM_SYNC.substring(0, process.env.TYPEORM_SYNC.length-1) || dbConfig.synchronize,
};
