import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
    @IsString({ message: 'Book name must be a string.' })
    @IsOptional()
    @ApiProperty({ required: false })
    bookName?: string;

    @IsString({ message: 'Category must be a string.' })
    @IsOptional()
    @ApiProperty({ required: false })
    category?: string;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @ApiProperty({ type: [Number], required: false })
    genreIds?: number[];

    @IsInt({ message: 'Author ID must be an integer.' })
    @IsOptional()
    @ApiProperty({ required: false })
    authorId?: number;

    @IsOptional()
    @IsInt({ message: 'Pages must be an integer.' })
    @ApiProperty({ required: false })
    pages?: number;

    @IsOptional()
    @IsString({ message: 'Summary must be a string.' })
    @ApiProperty({ required: false })
    summary?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    published?: Date;
}
