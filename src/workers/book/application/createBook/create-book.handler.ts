import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookCommand } from './create-book.command';
import { returnRes } from './response.dto';
import { CreateGenreCommand } from 'src/workers/genre/application/createGenres/create-genres.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: CreateBookCommand): Promise<returnRes> {
    const {
      bookName,
      category,
      authorId,
      pages,
      summary,
      published,
      genreIds = [],
      genreNames = [],
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

    const existBook = await this.dbService.book.findUnique({
      where: { bookName },
    });

    if (existBook) {
      return {
        status: 'error',
        statusCode: 409,
        message: `${bookName} already exists`,
      };
    }

    const genreIdList = [...genreIds];

    if (genreNames && genreNames.length > 0) {
      for (const genreName of genreNames) {
        let genre = await this.dbService.genre.findUnique({
          where: { name: genreName },
        });

        if (!genre) {
          await this.commandBus.execute(
            new CreateGenreCommand({ name: genreName }),
          );
          genre = await this.dbService.genre.findUnique({
            where: { name: genreName },
          });
        }

        if (genre && !genreIdList.includes(genre.id)) {
          genreIdList.push(genre.id);
        }
      }
    }

    await this.dbService.book.create({
      data: {
        ...bookData,
        detail: {
          create: bookDetailData,
        },
        genres: {
          create: genreIdList.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        detail: true,
        genres: {
          include: {
            genre: { select: { name: true } },
          },
        },
        author: true,
      },
    });

    return {
      status: 'success',
      statusCode: 201,
      message: 'Book created successfully',
    };
  }
}
