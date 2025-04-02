/* eslint-disable prettier/prettier */
export class CreateRestaurantDto {
    name: string;
    email: string;
    password: string;
    description?: string;
    coverPhoto?: string;
    breadcrumb?: string;
    avgCostPerPerson: number;
    rating?: number; // Default value is 0.0 in the Prisma schema
    hasDelivery: boolean;
    cuisine: string[]; // Categorías de cocina
    popularDishes?: number[]; // IDs of popular dishes
    menu?: number[]; // IDs of dishes in the menu
}