import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { TrainersService } from 'src/trainers/trainers.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private trainerService: TrainersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);
    const trainer = await this.trainerService.createNew(username, hashPassword);
    if (trainer) {
      return this.logIn(trainer.name, password);
    }
    throw new InternalServerErrorException('AUTH-0001');
  }

  async logIn(username: string, password: string): Promise<string> {
    const trainer = await this.trainerService.findByName(username);
    if (!trainer) {
      throw new BadRequestException('User not found');
    } else if (!(await bcrypt.compare(password, trainer.password))) {
      throw new UnauthorizedException();
    }
    const payload = { id: trainer.id, username: trainer.name };
    return await this.jwtService.signAsync(payload);
  }
}
