import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookDto } from './application/createBook/create-book.dto';
import { UpdateBookDto } from './application/updateBook/update-book.dto';
import { GetBookDto } from './application/getBook/get-book.dto';
import { BookDetailResponse } from './application/getBook/book-detail.dto';
import { IdBookDetailResponse } from './application/getBookById/id-book-detail.dto';
import { CreateBookCommand } from './application/createBook/create-book.command';
import { UpdateBookCommand } from './application/updateBook/update-book.command';
import { DeleteBookCommand } from './application/deleteBook/delete-book.command';
import { GetBooksQuery } from './application/getBook/get-book.query';
import { GetBookByIdQuery } from './application/getBookById/get-book-by-id.query';

@ApiTags('Books')
@ApiSecurity('API-KEY')
@Controller('books')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list of books' })
  @ApiOkResponse({
    type: [BookDetailResponse],
  })
  @ApiNotFoundResponse({ description: 'No Book Found.' })
  async findAll(
    @Query() searchParams: GetBookDto,
  ): Promise<BookDetailResponse[]> {
    return this.queryBus.execute(
      new GetBooksQuery(searchParams.search, searchParams.page),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Book ID' })
  @ApiOkResponse({
    type: [IdBookDetailResponse],
  })
  @ApiNotFoundResponse({ description: 'No Book Found.' })
  async findOne(@Param('id') id: number): Promise<IdBookDetailResponse> {
    return this.queryBus.execute(new GetBookByIdQuery(id));
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: 'Book successfully created.' })
  @ApiResponse({
    status: 409,
    description: `Book already exist`,
  })
  async create(@Body() createBookDto: CreateBookDto) {
    const {
      bookName,
      category,
      authorId,
      pages,
      summary,
      published,
      genreIds,
      genreNames,
    } = createBookDto;
    return this.commandBus.execute(
      new CreateBookCommand(
        bookName,
        authorId,
        category,
        pages,
        summary,
        published,
        genreIds,
        genreNames,
      ),
    );
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiParam({ name: 'id', required: true, description: 'Book ID' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, description: 'Book successfully updated.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiResponse({ status: 409, description: 'Book already exist.' })
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    const {
      bookName,
      category,
      authorId,
      pages,
      summary,
      published,
      genreIds,
    } = updateBookDto;
    return this.commandBus.execute(
      new UpdateBookCommand(
        id,
        bookName,
        category,
        authorId,
        pages,
        summary,
        published,
        genreIds,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Book ID' })
  @ApiResponse({ status: 204, description: 'Book successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async delete(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteBookCommand(id));
  }
}
