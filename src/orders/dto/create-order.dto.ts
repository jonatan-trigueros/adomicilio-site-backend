/* eslint-disable prettier/prettier */

export class CreateOrderDto {
    orderNumber: number;
    userId: number;
    restaurantId: number;
    deliveryPersonId?: number;
    errandServiceId?: number;
    dishes: { dishId: number; quantity: number }[];
    paymentMethod: string;
    address: string;
    status?: string = 'pending';
    subtotal: number;
    discountCoupon?: string;
    total: number;
    createdAt?: Date = new Date();
}