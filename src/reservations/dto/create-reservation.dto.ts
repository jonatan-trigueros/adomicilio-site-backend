/* eslint-disable prettier/prettier */
export class CreateReservationDto {
    userId: number;
    restaurantId: number;
    title: string;
    time: Date;
    table?: string;
    peopleCount: number;
    area?: string; // Interior, terraza, etc.
    specialRequests?: string;
    guests?: string[]; // Lista de invitados
    isActive?: boolean; // Reflecting the isActive field from the Prisma model
}