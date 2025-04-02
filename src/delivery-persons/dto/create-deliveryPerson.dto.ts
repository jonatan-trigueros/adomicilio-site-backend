/* eslint-disable prettier/prettier */
export class CreateDeliveryPersonDto {
    userId: number; 
    restaurantId?: number; 
    name: string; 
    username: string; 
    schedule?: string[]; 
    rating?: number; 
    email: string; 
    password: string; 
}
