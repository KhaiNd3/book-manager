import { CreateGenresDto } from './create-genres.dto';

export class CreateGenreCommand {
    constructor(public readonly createGenresDto: CreateGenresDto) {}
}
