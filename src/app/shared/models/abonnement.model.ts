import { IUser } from './user.model';
import { Academy } from './academy.model';

export class Abonnement {
    _id?: string;
    academy: Academy;
    frais: number;
    StartTime: Date;
    EndTime: Date;
    player: IUser;
}