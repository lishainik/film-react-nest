import { ConfigModule, ConfigService } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useFactory: (config: ConfigService): AppConfig => ({
    database: {
      driver: config.get<string>('DATABASE_DRIVER'),
      url: config.get<string>('DATABASE_URL'),
    },
  }),
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
