import { SizeItem } from "./sizeItem.model";
import { Item } from "./item.model";

export interface SubCategory {
    subCategoryName: string;
    description?: any;
    items: Item[];
    sizeItemList: SizeItem[];
}
