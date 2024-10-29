import {
  Controller,
  Param,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { IdBookDetailResponse } from './id-book-detail.dto';
import { GetBookByIdQuery } from './get-book-by-id.query';

@ApiTags('Books')
@ApiSecurity('API-KEY')
@Controller('books')
export class GetBookByIdEndpoint {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Book ID' })
  @ApiOkResponse({
    type: IdBookDetailResponse,
  })
  @ApiNotFoundResponse({ description: 'No Book Found.' })
  async findOne(@Param('id') id: number): Promise<IdBookDetailResponse> {
    return this.queryBus.execute(new GetBookByIdQuery(id));
  }
}
