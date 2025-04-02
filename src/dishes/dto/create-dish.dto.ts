/* eslint-disable prettier/prettier */
export class CreateDishDto {
  name: string;
  description?: string;
  price: number;
  preparationTime: number;
  ingredients: string[];
  gallery: string[];
  restaurantId: number;
  rating?: number; // Opcional, ya que tiene un valor predeterminado en la base de datos
}