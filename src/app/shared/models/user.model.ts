import { Stats } from "fs";

export interface ICredentails {
    email : string;
    password: string;
}
export interface IRegisterCredentails {
    email : string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface IUser {
    _id : string;
    firstName : string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    reviewd?: boolean;
    address?:string;
    telephone?: string;
    picture?: string;
}

export class User{
    _id : string;
    email: string;
    password?: string;
    role?: string;
    profile: {
        firstName : string;
        lastName: string;
        telephone?: string;
        address?: string;
        height?: string;
        weight?: number;
        age?: string;
        rightFooted?: number;
        position?: string;
        Team?: string;
        shirtNumber?: number;
    };
    createdAt: Date;
    updatedAt: Date;
    stats?: Stats;
    visible?: boolean;
    constructor(){
        this.email = "";
        this.password = "";
        this.profile = {
            firstName: "",
            lastName: "",
            telephone: '',
            address: '',

            
        };
    }
}

export interface IPayload{
    iss: string; //issuer
    iat : Date; //created At
    exp : Date; //expires in
    sub : {
      id : string;
      name : string; 
    }// user details
  }

  export enum Role {
    User = 1,
    Admin = 2
  }