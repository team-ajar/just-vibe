/*
  Warnings:

  - You are about to drop the column `userId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Artist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Artist` DROP FOREIGN KEY `Artist_userId_fkey`;

-- AlterTable
ALTER TABLE `Album` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_ArtistToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArtistToUser_AB_unique`(`A`, `B`),
    INDEX `_ArtistToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ArtistToUser` ADD CONSTRAINT `_ArtistToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistToUser` ADD CONSTRAINT `_ArtistToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
