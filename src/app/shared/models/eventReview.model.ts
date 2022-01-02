
import { EventC } from './event.model';
import { User } from './user.model';

export class EventReview {
    pace: number;
    defence: number;
    passe: number;
    drible: number;
    physique: number;
    shot: number;
    nbOfGoals: number;
    nbOfAssist: number;
    seance: EventC;
    player: User;
    played: boolean;
}