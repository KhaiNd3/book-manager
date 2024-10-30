import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiSecurity,
} from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

import { CreateBookDto } from './create-book.dto';
import { CreateBookCommand } from './create-book.command';

@ApiTags('Books')
@ApiSecurity('API-KEY')
@Controller('books')
export class CreateBooksEndpoint {
  constructor(private readonly commandBus: CommandBus) {}

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
}
