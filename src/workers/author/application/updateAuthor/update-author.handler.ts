import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAuthorCommand } from './update-author.command';
import { DatabaseService } from 'src/database/database.service';
import { returnRes } from './response.dto';

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler
    implements ICommandHandler<UpdateAuthorCommand>
{
    constructor(private readonly dBservice: DatabaseService) {}

    async execute(command: UpdateAuthorCommand): Promise<returnRes> {
        const { id, authorName, description } = command;

        const existingAuthor = await this.dBservice.author.findUnique({
            where: { id },
        });

        if (!existingAuthor) {
            return {
                status: 'error',
                statusCode: 409,
                message: `${authorName} already exists`,
            };
        }

        await this.dBservice.author.update({
            where: { id },
            data: {
                name: authorName,
                description: description,
            },
        });

        return {
            status: 'success',
            statusCode: 201,
            message: 'Book created successfully',
        };
    }
}
