import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TrainersModule } from 'src/trainers/trainers.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TrainersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '36000s' },
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
