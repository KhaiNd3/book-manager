-- DropForeignKey
ALTER TABLE `bookgenre` DROP FOREIGN KEY `BookGenre_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `bookgenre` DROP FOREIGN KEY `BookGenre_genreId_fkey`;

-- AddForeignKey
ALTER TABLE `BookGenre` ADD CONSTRAINT `BookGenre_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookGenre` ADD CONSTRAINT `BookGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
