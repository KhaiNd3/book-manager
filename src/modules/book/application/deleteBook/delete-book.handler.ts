import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DatabaseService } from 'src/database/database.service';
import { returnRes } from './response.dto';
import { DeleteBookCommand } from './delete-book.command';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
    constructor(private readonly dbService: DatabaseService) {}

    async execute(command: DeleteBookCommand): Promise<returnRes> {
        const { id } = command;

        // Check if the book exists before attempting to delete it
        const existingBook = await this.dbService.book.findUnique({
            where: { id },
        });

        if (!existingBook) {
            return {
                status: 'error',
                statusCode: 404,
                message: `Book not found`,
            };
        }

        await this.dbService.book.delete({
            where: { id },
        });

        return {
            status: 'success',
            statusCode: 200,
            message: 'Book deleted successfully',
        };
    }
}
