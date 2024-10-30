import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthorCommand } from './create-author.command';
import { DatabaseService } from 'src/database/database.service';
import { returnRes } from './response.dto';

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler
    implements ICommandHandler<CreateAuthorCommand>
{
    constructor(private readonly dBservice: DatabaseService) {}

    async execute(command: CreateAuthorCommand): Promise<returnRes> {
        const { authorName, description } = command;

        const existAuthor = await this.dBservice.author.findUnique({
            where: { name: authorName },
        });

        if (existAuthor) {
            return {
                status: 'error',
                statusCode: 409,
                message: `${authorName} already exists`,
            };
        }

        await this.dBservice.author.create({
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
