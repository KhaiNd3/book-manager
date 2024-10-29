-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_id_fkey`;

-- AddForeignKey
ALTER TABLE `BookDetail` ADD CONSTRAINT `BookDetail_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
