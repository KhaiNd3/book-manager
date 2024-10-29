-- DropForeignKey
ALTER TABLE `bookdetail` DROP FOREIGN KEY `BookDetail_bookId_fkey`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_id_fkey` FOREIGN KEY (`id`) REFERENCES `BookDetail`(`bookId`) ON DELETE CASCADE ON UPDATE CASCADE;
