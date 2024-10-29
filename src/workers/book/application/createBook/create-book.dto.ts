import {
    IsString,
    IsNotEmpty,
    IsInt,
    IsOptional,
    IsArray,
    IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @IsString({ message: 'Book name must be a string.' })
    @IsNotEmpty({ message: 'Book name is required.' })
    @ApiProperty()
    bookName: string;

    @IsString({ message: 'Category must be a string.' })
    @IsNotEmpty({ message: 'Category is required.' })
    @ApiProperty()
    category: string;

    @IsInt({ message: 'Author ID must be an integer.' })
    @IsNotEmpty({ message: 'Author ID is required.' })
    @ApiProperty()
    authorId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({ required: false })
    pages?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    summary?: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty({
        required: false,
        default: '',
        type: String,
        format: 'date-time',
    })
    published?: Date;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @ApiProperty({ required: false, type: [Number] })
    genreIds?: number[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ApiProperty({ required: false })
    genreNames?: string[];

    createdAt: Date;
    updatedAt: Date;
}
