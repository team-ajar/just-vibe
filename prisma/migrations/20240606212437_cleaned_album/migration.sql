/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Album` DROP COLUMN `releaseDate`;

-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `description`;
