import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CreateGenreCommandHandler } from './application/createGenres/create-genres.handler';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [CqrsModule, DatabaseModule],
  providers: [CreateGenreCommandHandler],
  exports: [CreateGenreCommandHandler],
})
export class GenreModule {}
