/*
  Warnings:

  - You are about to alter the column `name` on the `Song` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Artist` MODIFY `name` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `Song` MODIFY `name` VARCHAR(191) NOT NULL;
