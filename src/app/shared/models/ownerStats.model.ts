import { IUser } from './user.model';

export class IOwnerStats {
    coaches : number;
    players: number;
    groupes: number;
    seances: Object;
    bestPlayers?: any[];
}   

export class ICoachStats {
    academies : number;
    players: number;
    groupes: number;
    seances: any;
    bestPlayers?: any[];
    bestGroupe?: any;
}   