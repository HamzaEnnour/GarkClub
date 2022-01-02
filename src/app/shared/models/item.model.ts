import { Price } from "./price.model";

export interface Item {
    name: string;
    description: string;
    priceList: Price[];
}