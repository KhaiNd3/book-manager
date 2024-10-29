-- CreateTable
CREATE TABLE `BookDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `pages` INTEGER NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `published` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BookDetail_bookId_key`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookDetail` ADD CONSTRAINT `BookDetail_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
