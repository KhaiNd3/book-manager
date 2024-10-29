import {
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAuthorCommand } from './application/createAuthor/create-author.command';
import { UpdateAuthorCommand } from './application/updateAuthor/update-author.command';
import { CreateAuthorDto } from './application/createAuthor/create-author.dto';
import { UpdateAuthorDto } from './application/updateAuthor/update-author.dto';
import { returnRes } from './application/createAuthor/response.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly commandBus: CommandBus) {}

  /*
        Create 
        Method: Post
        */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<returnRes> {
    return this.commandBus.execute(
      new CreateAuthorCommand(
        createAuthorDto.name,
        createAuthorDto.description,
      ),
    );
  }

  /*
        Update
        Method: Patch
        */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<returnRes> {
    return this.commandBus.execute(
      new UpdateAuthorCommand(
        id,
        updateAuthorDto.name,
        updateAuthorDto.description,
      ),
    );
  }
}
