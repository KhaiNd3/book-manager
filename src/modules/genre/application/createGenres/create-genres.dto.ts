import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGenresDto {
    @IsString({ message: 'Book name must be a string.' })
    @IsNotEmpty({ message: 'Book name is required.' })
    name: string;
}
