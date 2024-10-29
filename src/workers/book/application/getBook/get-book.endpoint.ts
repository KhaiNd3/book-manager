import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetBookDto } from './get-book.dto';
import { BookDetailResponse } from './book-detail.dto';
import { GetBooksQuery } from './get-book.query';

@ApiTags('Books')
@ApiSecurity('API-KEY')
@Controller('books')
export class GetBookEndpoint {
  constructor(private readonly queryBus: QueryBus) {}

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
}
