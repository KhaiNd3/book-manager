import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorController } from './author.controller';
import { DatabaseModule } from 'src/database/database.module';

// Command Handlers
import { CreateAuthorHandler } from './application/createAuthor/create-author.handler';
import { UpdateAuthorHandler } from './application/updateAuthor/update-author.handler';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [CreateAuthorHandler, UpdateAuthorHandler],
  controllers: [AuthorController],
})
export class AuthorModule {}
