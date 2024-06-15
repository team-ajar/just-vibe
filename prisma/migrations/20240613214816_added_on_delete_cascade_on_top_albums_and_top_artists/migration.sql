-- DropForeignKey
ALTER TABLE `TopAlbums` DROP FOREIGN KEY `TopAlbums_albumId_fkey`;

-- DropForeignKey
ALTER TABLE `TopAlbums` DROP FOREIGN KEY `TopAlbums_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TopArtists` DROP FOREIGN KEY `TopArtists_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `TopArtists` DROP FOREIGN KEY `TopArtists_userId_fkey`;

-- AddForeignKey
ALTER TABLE `TopAlbums` ADD CONSTRAINT `TopAlbums_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopAlbums` ADD CONSTRAINT `TopAlbums_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopArtists` ADD CONSTRAINT `TopArtists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopArtists` ADD CONSTRAINT `TopArtists_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
