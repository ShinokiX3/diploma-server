/* eslint-disable prettier/prettier */
export class CreateProductDTO {
    code: string;
    title: string;
    description: string;
    cost: number;
    discount: number;
    inStockQuantity: number;
    isNew: boolean;
    category: string;
    brand: string;
    strength: string;
    capacity: string;
    kind: string;
    manufacturer: string;
    packing: string;
}

export class CreateProductAttributeDTO {
    value: string;
}
