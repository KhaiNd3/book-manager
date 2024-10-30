import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DatabaseService } from 'src/database/database.service';
import { GetBookByIdQuery } from './get-book-by-id.query';
import { IdBookDetailResponse } from './id-book-detail.dto';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdHandler implements IQueryHandler<GetBookByIdQuery> {
    constructor(private readonly dbService: DatabaseService) {}

    async execute(query: GetBookByIdQuery): Promise<IdBookDetailResponse> {
        const book = await this.dbService.book.findUnique({
            where: { id: query.id },
            include: {
                detail: true,
                author: { select: { name: true } },
                genres: {
                    include: {
                        genre: { select: { name: true } },
                    },
                },
            },
        });

        if (!book) throw new NotFoundException('Book Not Found');

        const genreNames = book.genres.map((g) => g.genre.name);

        return {
            id: book.id,
            bookName: book.bookName,
            authorName: book.author?.name,
            category: book.category,
            genres: genreNames,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            pages: book.detail?.pages,
            summary: book.detail?.summary,
            published: book.detail?.published,
        };
    }
}
