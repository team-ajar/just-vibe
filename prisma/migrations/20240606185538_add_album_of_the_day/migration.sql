-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `googleId` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `albumId` INTEGER NOT NULL,

    INDEX `Review_albumId_fkey`(`albumId`),
    INDEX `Review_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    INDEX `Event_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `artistId` INTEGER NOT NULL,

    INDEX `Album_artistId_fkey`(`artistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Song` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `albumId` INTEGER NOT NULL,

    INDEX `Song_albumId_fkey`(`albumId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEvent` (
    `userId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,

    INDEX `UserEvent_eventId_fkey`(`eventId`),
    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `entity` ENUM('ALBUM', 'ARTIST', 'SONG') NOT NULL,
    `entityId` INTEGER NOT NULL,

    INDEX `Favorite_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumOfTheDay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `albumId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `AlbumOfTheDay_albumId_fkey`(`albumId`),
    INDEX `AlbumOfTheDay_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvent` ADD CONSTRAINT `UserEvent_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvent` ADD CONSTRAINT `UserEvent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumOfTheDay` ADD CONSTRAINT `AlbumOfTheDay_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumOfTheDay` ADD CONSTRAINT `AlbumOfTheDay_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
