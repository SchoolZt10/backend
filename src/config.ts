import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-yet";

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const CLIENT_URL = IS_DEVELOPMENT ? 'http://localhost:3000' : 'http://shooclzt10.site';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const isProduction = configService.get<string>('NODE_ENV') === 'production';
    const store = await redisStore({
      socket: {
        host: configService.get<string>('REDIS_HOST'),
        port: parseInt(configService.get<string>('REDIS_PORT')!),
      },
      ttl: 5,
      password:
        (isProduction && configService.get<string>('REDIS_PASSWORD')) ||
        undefined,
    });

    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};