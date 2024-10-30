import { Controller, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteBookCommand } from './delete-book.command';

@ApiTags('Books')
@ApiSecurity('API-KEY')
@Controller('books')
export class DeleteBookEndpoint {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Book ID' })
  @ApiResponse({ status: 204, description: 'Book successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async delete(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteBookCommand(id));
  }
}
