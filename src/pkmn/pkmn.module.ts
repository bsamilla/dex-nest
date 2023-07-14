import { Module } from '@nestjs/common';
import { PKMNService } from './pkmn.service';
import { PKMNResolver } from './pkmn.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PKMN } from './pkmn.model';

@Module({
  imports: [TypeOrmModule.forFeature([PKMN])],
  providers: [PKMNService, PKMNResolver],
})
export class PKMNModule {}
