
export enum EBookCategory {
    FANTASY = "fantasy",
    SCIENCE_FICTION = "science_fiction",
    ROMANCE = "romance",
    MYSTERY = "mystery",
}

export enum EUnit{
    BOX = "box",
    PIECE = "piece",
}

export type TStockDetail = {
    unit: EUnit;
    quantity: number;
    date: Date;
    enableLowStockAlert: boolean;
    lowStockAlertQuantity: number;
}

export type TPriceDetail = {
    price: number;
    tax: number;
    discount: number;
}


export type TBook = {
    name: string;
    image: string;
    category: EBookCategory;
    code : number;
    description: string;
    price: TPriceDetail;
    stock : TStockDetail;
}