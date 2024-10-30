import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { GetBooksQuery } from './get-book.query';
import { BookDetailResponse } from './book-detail.dto';

@QueryHandler(GetBooksQuery)
export class GetBooksHandler implements IQueryHandler<GetBooksQuery> {
    constructor(private readonly dbService: DatabaseService) {}

    async execute(query: GetBooksQuery): Promise<BookDetailResponse[]> {
        const opts: Prisma.BookWhereInput = {};
        const { search, page = 1 } = query;
        const limit = 5;
        const skip = (page - 1) * limit;

        if (search) {
            opts.OR = [
                { bookName: { contains: search } },
                { category: { contains: search } },
                {
                    author: {
                        name: { contains: search },
                    },
                },
            ];
        }

        const foundList = await this.dbService.book.findMany({
            where: opts,
            include: {
                author: { select: { name: true } },
                detail: true,
                genres: {
                    include: {
                        genre: { select: { name: true } },
                    },
                },
            },
            skip,
            take: limit,
        });

        return foundList.map(
            ({
                id,
                bookName,
                category,
                genres,
                createdAt,
                updatedAt,
                author,
                detail,
            }) => ({
                id,
                bookName,
                category,
                genres: genres.map((g) => g.genre.name),
                createdAt,
                updatedAt,
                authorName: author?.name,
                pages: detail?.pages,
                summary: detail?.summary,
                published: detail?.published,
            }),
        );
    }
}
