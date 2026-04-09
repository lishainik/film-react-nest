import { ConfigService } from '@nestjs/config';

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      type: configService.get<string>('DATABASE_DRIVER') || 'postgres',
      driver: configService.get<string>('DATABASE_DRIVER', 'postgres'),
      url: configService.get<string>(
        'DATABASE_URL',
        'postgres://localhost:5432/prac',
      ),
      username: configService.get<string>('DATABASE_USERNAME', 'prac_user'),
      password: configService.get<string>('DATABASE_PASSWORD', '1234'),
    },
  }),
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  type: string;
  driver: string;
  url: string;
  username: string;
  password: string;
}
