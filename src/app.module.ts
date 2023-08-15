import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import models from './models';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PKMNModule } from './pkmn/pkmn.module';
import { ChallengeModule } from './challenges/challenge.module';
import { AuthModule } from './auth/auth.module';
import { TrainersModule } from './trainers/trainers.module';
import { ProgressModule } from './progress/progress.module';
import { TargetModule } from './target/target.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { DataloaderModule } from './dataloader/dataloader.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
          context: ({ req }: { req: Request }) => ({
            req,
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: models,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    PKMNModule,
    ChallengeModule,
    AuthModule,
    TrainersModule,
    ProgressModule,
    TargetModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
