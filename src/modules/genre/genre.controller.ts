import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGenresDto } from './application/createGenres/create-genres.dto';
import { CreateGenreCommand } from './application/createGenres/create-genres.command';

@Controller('genre')
export class GenreController {
  constructor(private readonly commandBus: CommandBus) {}

  /*
    Create 
    Method: Post
    */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAuthor(createAuthorDto: CreateGenresDto) {
    return this.commandBus.execute(new CreateGenreCommand(createAuthorDto));
  }
}
