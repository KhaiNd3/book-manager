import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/database/database.module';
import { GenreModule } from '../genre/genre.module';

import * as useCases from './application';

const applications = Object.values(useCases);
const handlers = applications.filter((x) => x.name.endsWith('Handler'));
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));

@Module({
  imports: [CqrsModule, DatabaseModule, GenreModule],
  controllers: [...endpoints],
  providers: [...handlers],
})
export class BooksModule {}
