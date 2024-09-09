/*
  Warnings:

  - Added the required column `thumbnail` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `thumbnail` VARCHAR(45) NOT NULL,
    ADD COLUMN `type` ENUM('PRODUCTO', 'EVENTO') NOT NULL;
