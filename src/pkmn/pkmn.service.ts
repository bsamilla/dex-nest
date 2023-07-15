import { Injectable } from '@nestjs/common';
import { PKMN } from './pkmn.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PKMNService {
  constructor(
    @InjectRepository(PKMN) private pkmnRepository: Repository<PKMN>,
  ) {}
  findAll(): Promise<PKMN[]> {
    return this.pkmnRepository.find({
      order: {
        pkmnID: 'ASC',
        variance: 'ASC',
        variantName: 'ASC',
      },
    });
  }
}
