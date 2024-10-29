// import { Injectable } from '@nestjs/common';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { CreateBookCommand } from './createBook/create-book.command';
// import { UpdateBookCommand } from './updateBook/update-book.command';
// import { DeleteBookCommand } from './deleteBook/delete-book.command';
// import { GetBooksQuery } from './getBooks/get-book.query';
// import { GetBookByIdQuery } from './queries/get-book-by-id.query';
// import { BookDetailResponse } from './dto/book-detail.dto';
// import { GetBookDto } from './getBooks/get-book.dto';
// import { CreateBookDto } from './createBook/create-book.dto';
// import { UpdateBookDto } from './updateBook/update-book.dto';

// @Injectable()
// export class BookService {
//     constructor(
//         private readonly commandBus: CommandBus,
//         private readonly queryBus: QueryBus,
//     ) {}

//     async findAll(searchParams: GetBookDto): Promise<BookDetailResponse[]> {
//         return this.queryBus.execute(
//             new GetBooksQuery(searchParams.search, searchParams.page),
//         );
//     }

//     async findOne(id: number): Promise<BookDetailResponse> {
//         return this.queryBus.execute(new GetBookByIdQuery(id));
//     }

//     async createBook(createBookDto: CreateBookDto) {
//         return this.commandBus.execute(
//             new CreateBookCommand(
//                 createBookDto.bookName,
//                 createBookDto.authorId,
//                 createBookDto.category,
//                 createBookDto.pages,
//                 createBookDto.summary,
//                 createBookDto.published,
//                 createBookDto.genreIds,
//                 createBookDto.genreNames,
//             ),
//         );
//     }

//     async updateBook(id: number, updateBookDto: UpdateBookDto) {
//         return this.commandBus.execute(
//             new UpdateBookCommand(
//                 id,
//                 updateBookDto.bookName,
//                 updateBookDto.category,
//                 updateBookDto.authorId,
//                 updateBookDto.pages,
//                 updateBookDto.summary,
//                 updateBookDto.published,
//                 updateBookDto.genreIds,
//             ),
//         );
//     }

//     async deleteBook(id: number) {
//         return this.commandBus.execute(new DeleteBookCommand(id));
//     }
// }
