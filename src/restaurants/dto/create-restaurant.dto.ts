/* eslint-disable prettier/prettier */
export class CreateRestaurantDto {
    name: string;
    email: string;
    password: string;
    description?: string;
    coverPhoto?: string;
    breadcrumb?: string;
    avgCostPerPerson: number;
    rating?: number; // Valor predeterminado es 0.0 en el esquema de Prisma
    hasDelivery: boolean;
    cuisine: string[]; // Categorías de cocina
    popularDishes?: number[]; // Add this property to match the service method
    menu?: number[]; // IDs de platos en el menú
    reviews?: number[]; // IDs de reseñas
    orders?: number[]; // IDs de pedidos
    reservations?: number[]; // IDs de reservaciones
    favorites?: number[]; // IDs de favoritos
    deliveryPersons?: number[]; // IDs de repartidores
    errandServices?: number[]; // IDs de servicios de recados
    createdAt?: Date; // Opcional, el valor predeterminado es ahora()
    isActive?: boolean; // Opcional, el valor predeterminado es true
    role?: string; // Opcional, el valor predeterminado es "restaurant"
}