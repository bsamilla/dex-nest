import { PKMN } from './pkmn/pkmn.model';
import { Challenge } from './challenges/challenge.model';
import { Trainer } from './trainers/trainers.model';
import { Progress } from './progress/progress.model';
import { Target } from './target/target.model';

const models = [PKMN, Challenge, Trainer, Progress, Target];

export { PKMN, Challenge, Trainer, Target };
export default models;
