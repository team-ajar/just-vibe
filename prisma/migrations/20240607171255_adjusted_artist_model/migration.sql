/*
  Warnings:

  - You are about to drop the column `artistId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Album` table. All the data in the column will be lost.
  - Added the required column `albumName` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artistName` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Album` DROP FOREIGN KEY `Album_artistId_fkey`;

-- AlterTable
ALTER TABLE `Album` DROP COLUMN `artistId`,
    DROP COLUMN `name`,
    ADD COLUMN `albumName` VARCHAR(191) NOT NULL,
    ADD COLUMN `artistName` VARCHAR(191) NOT NULL;
