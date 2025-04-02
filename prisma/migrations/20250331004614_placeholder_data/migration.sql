/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preparationTime` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgCostPerPerson` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDelivery` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "ingredients" TEXT[],
ADD COLUMN     "preparationTime" INTEGER NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveryPersonId" INTEGER,
ADD COLUMN     "discountCoupon" TEXT,
ADD COLUMN     "errandServiceId" INTEGER,
ADD COLUMN     "orderNumber" INTEGER NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "restaurantId" INTEGER NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "avgCostPerPerson" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "breadcrumb" TEXT,
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "cuisine" TEXT[],
ADD COLUMN     "hasDelivery" BOOLEAN NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "badges" TEXT[],
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "favoriteFood" TEXT,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER,
    "dishId" INTEGER,
    "deliveryPersonId" INTEGER,
    "errandServiceId" INTEGER,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "comment" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "table" TEXT,
    "peopleCount" INTEGER NOT NULL,
    "area" TEXT,
    "specialRequests" TEXT,
    "guests" TEXT[],

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER,
    "dishId" INTEGER,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryPerson" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "schedule" TEXT[],

    CONSTRAINT "DeliveryPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrandService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "restaurantId" INTEGER,

    CONSTRAINT "ErrandService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PopularDishes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PopularDishes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_userId_key" ON "Reservation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_restaurantId_dishId_key" ON "Favorite"("userId", "restaurantId", "dishId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryPerson_userId_key" ON "DeliveryPerson"("userId");

-- CreateIndex
CREATE INDEX "_PopularDishes_B_index" ON "_PopularDishes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryPersonId_fkey" FOREIGN KEY ("deliveryPersonId") REFERENCES "DeliveryPerson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_errandServiceId_fkey" FOREIGN KEY ("errandServiceId") REFERENCES "ErrandService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_deliveryPersonId_fkey" FOREIGN KEY ("deliveryPersonId") REFERENCES "DeliveryPerson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_errandServiceId_fkey" FOREIGN KEY ("errandServiceId") REFERENCES "ErrandService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryPerson" ADD CONSTRAINT "DeliveryPerson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryPerson" ADD CONSTRAINT "DeliveryPerson_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrandService" ADD CONSTRAINT "ErrandService_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PopularDishes" ADD CONSTRAINT "_PopularDishes_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PopularDishes" ADD CONSTRAINT "_PopularDishes_B_fkey" FOREIGN KEY ("B") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
