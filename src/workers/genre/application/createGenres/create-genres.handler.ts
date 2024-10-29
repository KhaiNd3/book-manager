import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DatabaseService } from 'src/database/database.service';
import { CreateGenreCommand } from './create-genres.command';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateGenreCommand)
export class CreateGenreCommandHandler
    implements ICommandHandler<CreateGenreCommand>
{
    constructor(
        @Inject(DatabaseService)
        private readonly databaseService: DatabaseService,
    ) {}

    async execute(command: CreateGenreCommand): Promise<{ message: string }> {
        const { createGenresDto } = command;

        await this.databaseService.genre.create({
            data: createGenresDto,
        });

        return { message: 'Request was successful' };
    }
}
