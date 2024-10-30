import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { returnRes } from './response.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateBookCommand } from './update-book.command';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
    constructor(private readonly dbService: DatabaseService) {}

    async execute(command: UpdateBookCommand): Promise<returnRes> {
        const {
            id,
            bookName,
            category,
            authorId,
            pages,
            summary,
            published,
            genreIds = [],
        } = command;

        const bookData = {
            bookName,
            category,
            authorId,
        };

        const bookDetailData = {
            pages,
            summary,
            published,
        };

        // Check if the book exists
        const existingBook = await this.dbService.book.findUnique({
            where: { id },
            include: { detail: true, genres: true },
        });

        if (!existingBook) {
            return {
                status: 'error',
                statusCode: 404,
                message: `Book not found`,
            };
        }

        // Check if the new book name already exists in another book
        if (bookData.bookName) {
            const existingName = await this.dbService.book.findUnique({
                where: { bookName: bookData.bookName },
            });

            if (existingName && existingName.id !== id) {
                return {
                    status: 'error',
                    statusCode: 409,
                    message: `${bookData.bookName} already exists`,
                };
            }
        }

        // Determine genres to add and remove
        const existingGenreIds: number[] = existingBook.genres.map(
            (g) => g.genreId,
        );
        const addGenres = genreIds
            .filter((genreId) => !existingGenreIds.includes(genreId))
            .map((genreId) => ({
                genre: { connect: { id: genreId } },
            }));

        const removeGenres = existingGenreIds
            .filter((genreId) => !genreIds.includes(genreId))
            .map((genreId) => ({
                bookId_genreId: {
                    bookId: id,
                    genreId: genreId,
                },
            }));

        // Update the book with the new data
        await this.dbService.book.update({
            where: { id },
            data: {
                ...bookData,
                detail: {
                    update: {
                        ...bookDetailData,
                    },
                },
                genres: {
                    create: addGenres,
                    delete: removeGenres,
                },
            },
            include: {
                detail: true,
                genres: {
                    include: {
                        genre: { select: { name: true } },
                    },
                },
            },
        });

        return {
            status: 'success',
            statusCode: 200,
            message: 'Book updated successfully',
        };
    }
}
