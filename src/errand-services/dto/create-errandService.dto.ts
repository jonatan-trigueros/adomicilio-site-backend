/* eslint-disable prettier/prettier */
export class CreateErrandServiceDto {
    name: string;
    email: string;
    password: string;
    rating?: number = 0.0; // Optional, default is 0.0
    restaurantId?: number; // Optional, for affiliation with a restaurant
}