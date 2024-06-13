-- CreateTable
CREATE TABLE `TopAlbums` (
    `position` INTEGER NOT NULL,
    `albumId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `TopAlbums_position_albumId_userId_key`(`position`, `albumId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TopArtists` (
    `position` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `artistId` INTEGER NOT NULL,

    UNIQUE INDEX `TopArtists_position_artistId_userId_key`(`position`, `artistId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TopAlbums` ADD CONSTRAINT `TopAlbums_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopAlbums` ADD CONSTRAINT `TopAlbums_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopArtists` ADD CONSTRAINT `TopArtists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopArtists` ADD CONSTRAINT `TopArtists_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
