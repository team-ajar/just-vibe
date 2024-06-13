/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserEvent` DROP FOREIGN KEY `UserEvent_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEvent` DROP FOREIGN KEY `UserEvent_userId_fkey`;

-- DropTable
DROP TABLE `Event`;

-- DropTable
DROP TABLE `UserEvent`;
