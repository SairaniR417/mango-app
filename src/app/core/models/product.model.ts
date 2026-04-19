export interface Product {
    id?: number;
    name: string;
    image: string;
    price: number;       // API price
    basePrice: number;   // price per kg
    selectedWeight: number;
    variety?: string;
}

export interface CartItem {
    name: string;
    pricePerKg: number;
    weight: number;
}