import {
  Controller,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateBookDto } from './update-book.dto';
import { UpdateBookCommand } from './update-book.command';

@ApiTags('Books')
@ApiSecurity('API-KEY')
@Controller('books')
export class UpdateBookEndpoint {
  constructor(private readonly commandBus: CommandBus) {}

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
}
