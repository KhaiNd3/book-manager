import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
    @IsString({ message: 'Book name must be a string.' })
    @IsOptional()
    name?: string;

    @IsString({ message: 'Category must be a string.' })
    @IsOptional()
    description?: string;
}
