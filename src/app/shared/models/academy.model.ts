import { User } from './user.model';

export class Academy {
    _id?: string;
    numero?: string;
    opening: string;
    closing: string;
    color?: string;
    owner?: User;
    address: string;
    name: string;
    image?: string;
    frais?: number;

    constructor(){
        this._id= "";
        this.opening= "";
        this.closing= "";
        this.address= "";
        this.name= "";
        this.color= "#d50103";
        this.owner = null;
    }
}