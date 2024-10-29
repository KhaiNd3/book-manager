import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BooksModule } from './books/books.module'; old
import { BooksModule } from './workers/book';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './workers/author/author.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseService } from './database/database.service';
import { ApiKeyMiddleware } from './common/middleware/auth.middleware';
import { validateConfig } from './config/env.config';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    BooksModule,
    DatabaseModule,
    AuthorModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validate: validateConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
