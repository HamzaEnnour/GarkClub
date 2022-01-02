import { Academy } from './academy.model';
import { IUser } from './user.model';

export class Group {
    _id?: string;
    name: string;
    color?: string;
    academy?: Academy;
    coach?: IUser;
    image?:string;
    players?: IUser[];
}