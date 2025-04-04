export class CreateDishDto {
  id?: number;
  name: string;
  description?: string;
  price: number;
  preparationTime: number;
  ingredients: string[];
  gallery: string[];
  restaurantId: number; // Este es suficiente para relacionarlo con un restaurante
  createdAt?: Date;
  updatedAt?: Date;
}
