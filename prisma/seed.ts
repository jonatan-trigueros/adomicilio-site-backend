/* eslint-disable prettier/prettier */

/*
Seeds para la base de datos de Adomicilio.site, placeholder para las pruebas, desarrollo y staging entre otras cosas.
*/
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    await prisma.user.createMany({
        data: [
            {
                email: 'user1@example.com',
                username: 'userone',
                name: 'User One',
                password: 'password1',
                profilePic: 'https://example.com/user1.jpg',
                bio: 'Bio for User One',
                favoriteFood: 'Pizza',
                badges: ['Newbie', 'Foodie'],
            },
            {
                email: 'user2@example.com',
                username: 'usertwo',
                name: 'User Two',
                password: 'password2',
                profilePic: 'https://example.com/user2.jpg',
                bio: 'Bio for User Two',
                favoriteFood: 'Sushi',
                badges: ['Explorer'],
            },
            {
                email: 'user3@example.com',
                username: 'userthree',
                name: 'User Three',
                password: 'password3',
                profilePic: 'https://example.com/user3.jpg',
                bio: 'Bio for User Three',
                favoriteFood: 'Burgers',
                badges: ['Chef'],
            },
            {
                email: 'user4@example.com',
                username: 'userfour',
                name: 'User Four',
                password: 'password4',
                profilePic: 'https://example.com/user4.jpg',
                bio: 'Bio for User Four',
                favoriteFood: 'Pasta',
                badges: ['Critic'],
            },
            {
                email: 'user5@example.com',
                username: 'userfive',
                name: 'User Five',
                password: 'password5',
                profilePic: 'https://example.com/user5.jpg',
                bio: 'Bio for User Five',
                favoriteFood: 'Salad',
                badges: ['Adventurer'],
            },
        ],
    });

    // Seed restaurants
    await prisma.restaurant.createMany({
        data: [
            {
                name: 'Restaurant One',
                email: 'restaurant1@example.com',
                password: 'password1',
                description: 'Description for Restaurant One',
                coverPhoto: 'https://example.com/restaurant1.jpg',
                breadcrumb: 'Fine Dining',
                avgCostPerPerson: 25.0,
                rating: 4.5,
                hasDelivery: true,
                cuisine: ['Italian', 'Pizza'],
            },
            {
                name: 'Restaurant Two',
                email: 'restaurant2@example.com',
                password: 'password2',
                description: 'Description for Restaurant Two',
                coverPhoto: 'https://example.com/restaurant2.jpg',
                breadcrumb: 'Casual Dining',
                avgCostPerPerson: 15.0,
                rating: 4.0,
                hasDelivery: false,
                cuisine: ['Japanese', 'Sushi'],
            },
            {
                name: 'Restaurant Three',
                email: 'restaurant3@example.com',
                password: 'password3',
                description: 'Description for Restaurant Three',
                coverPhoto: 'https://example.com/restaurant3.jpg',
                breadcrumb: 'Fast Food',
                avgCostPerPerson: 10.0,
                rating: 3.8,
                hasDelivery: true,
                cuisine: ['American', 'Burgers'],
            },
            {
                name: 'Restaurant Four',
                email: 'restaurant4@example.com',
                password: 'password4',
                description: 'Description for Restaurant Four',
                coverPhoto: 'https://example.com/restaurant4.jpg',
                breadcrumb: 'Café',
                avgCostPerPerson: 8.0,
                rating: 4.2,
                hasDelivery: false,
                cuisine: ['French', 'Pastries'],
            },
            {
                name: 'Restaurant Five',
                email: 'restaurant5@example.com',
                password: 'password5',
                description: 'Description for Restaurant Five',
                coverPhoto: 'https://example.com/restaurant5.jpg',
                breadcrumb: 'Street Food',
                avgCostPerPerson: 5.0,
                rating: 4.7,
                hasDelivery: true,
                cuisine: ['Mexican', 'Tacos'],
            },
        ],
    });

    // Seed dishes
    await prisma.dish.createMany({
        data: [
            {
                name: 'Dish One',
                description: 'Description for Dish One',
                price: 10.0,
                preparationTime: 15,
                rating: 4.5,
                ingredients: ['Ingredient1', 'Ingredient2'],
                gallery: ['https://example.com/dish1.jpg'],
                restaurantId: 1,
            },
            {
                name: 'Dish Two',
                description: 'Description for Dish Two',
                price: 12.0,
                preparationTime: 20,
                rating: 4.0,
                ingredients: ['Ingredient3', 'Ingredient4'],
                gallery: ['https://example.com/dish2.jpg'],
                restaurantId: 2,
            },
            {
                name: 'Dish Three',
                description: 'Description for Dish Three',
                price: 8.0,
                preparationTime: 10,
                rating: 3.8,
                ingredients: ['Ingredient5', 'Ingredient6'],
                gallery: ['https://example.com/dish3.jpg'],
                restaurantId: 3,
            },
            {
                name: 'Dish Four',
                description: 'Description for Dish Four',
                price: 15.0,
                preparationTime: 25,
                rating: 4.2,
                ingredients: ['Ingredient7', 'Ingredient8'],
                gallery: ['https://example.com/dish4.jpg'],
                restaurantId: 4,
            },
            {
                name: 'Dish Five',
                description: 'Description for Dish Five',
                price: 5.0,
                preparationTime: 5,
                rating: 4.7,
                ingredients: ['Ingredient9', 'Ingredient10'],
                gallery: ['https://example.com/dish5.jpg'],
                restaurantId: 5,
            },
        ],
    });

    // Seed orders
    await prisma.order.createMany({
        data: [
            {
                orderNumber: 1001,
                userId: 1,
                restaurantId: 1,
                paymentMethod: 'Credit Card',
                address: '123 Main St',
                status: 'completed',
                subtotal: 50.0,
                discountCoupon: 'DISCOUNT10',
                total: 45.0,
            },
            {
                orderNumber: 1002,
                userId: 2,
                restaurantId: 2,
                paymentMethod: 'PayPal',
                address: '456 Elm St',
                status: 'pending',
                subtotal: 30.0,
                discountCoupon: null,
                total: 30.0,
            },
            {
                orderNumber: 1003,
                userId: 3,
                restaurantId: 3,
                paymentMethod: 'Cash',
                address: '789 Oak St',
                status: 'cancelled',
                subtotal: 20.0,
                discountCoupon: 'DISCOUNT5',
                total: 15.0,
            },
            {
                orderNumber: 1004,
                userId: 4,
                restaurantId: 4,
                paymentMethod: 'Credit Card',
                address: '101 Pine St',
                status: 'completed',
                subtotal: 40.0,
                discountCoupon: null,
                total: 40.0,
            },
            {
                orderNumber: 1005,
                userId: 5,
                restaurantId: 5,
                paymentMethod: 'Debit Card',
                address: '202 Maple St',
                status: 'completed',
                subtotal: 25.0,
                discountCoupon: 'DISCOUNT15',
                total: 21.25,
            },
        ],
    });

    console.log('Datos iniciales insertados correctamente');
}

main()
    .catch((e) => console.error(e))
    .finally(() => {
        prisma.$disconnect();
    });
