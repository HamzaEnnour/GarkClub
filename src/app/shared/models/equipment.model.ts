import { Academy } from './academy.model';

export class EquipmentModel {
    _id?: string;
    category: string;
    action?: string;
    quantity: number;
    unitPrice: number;
    url?: string;
    academy?: Academy;
    icon?: string;
    color?:string;
}