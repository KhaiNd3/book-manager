import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
    @IsString({ message: 'Author name must be a string.' })
    @IsNotEmpty({ message: 'Author name is required.' })
    name: string;

    @IsString({ message: 'Description must be a string.' })
    description: string;

    createdAt: Date;
    updatedAt: Date;
}
