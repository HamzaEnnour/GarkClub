import { IUser } from './user.model';
export class CoachReview {
    _id?: string;
    note: number;
    coach: IUser;
    player?: IUser;
}