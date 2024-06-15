/*
  Warnings:

  - You are about to drop the column `musicPost` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `postType` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `musicPost`,
    ADD COLUMN `albumId` INTEGER NULL,
    ADD COLUMN `reviewId` INTEGER NULL,
    MODIFY `postType` ENUM('REVIEW', 'ALBUMOFTHEDAY') NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
