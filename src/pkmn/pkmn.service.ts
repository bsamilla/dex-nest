import { Injectable } from '@nestjs/common';
import { PKMN } from './pkmn.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PKMNService {
  constructor(
    @InjectRepository(PKMN) private pkmnRepository: Repository<PKMN>,
  ) {}

  async findById(id: number): Promise<PKMN | null> {
    return await this.pkmnRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<PKMN[]> {
    return this.pkmnRepository.find({
      order: {
        dexNumber: 'ASC',
        variance: 'ASC',
        variantName: 'ASC',
      },
    });
  }
}
