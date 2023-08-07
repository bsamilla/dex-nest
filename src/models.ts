import { PKMN } from './pkmn/pkmn.model';
import { Challenge } from './challenges/challenge.model';
import { Trainer } from './trainers/trainers.model';
import { Progress } from './catches/progress.model';

const models = [PKMN, Challenge, Trainer, Progress];

export { PKMN, Challenge, Trainer };
export default models;
