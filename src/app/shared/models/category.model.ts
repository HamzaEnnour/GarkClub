import { SubCategory } from "./subCategory.model";

export interface Category {
    categoryName: string;
    subCategoryList: SubCategory[];
}