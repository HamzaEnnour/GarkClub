import { Group } from './group.model';
import { IUser, User } from './user.model';

export class EventC {
    _id?: string;
    name?: string;
    groupe?: Group;
    coach?: IUser;
    startTime: Date;
    endTime: Date;
    type?: string;
}