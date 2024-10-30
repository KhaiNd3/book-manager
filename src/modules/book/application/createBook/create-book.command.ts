export class CreateBookCommand {
    constructor(
        public readonly bookName: string,
        public readonly authorId: number,
        public readonly category: string,
        public readonly pages?: number,
        public readonly summary?: string,
        public readonly published?: Date,
        public readonly genreIds?: number[],
        public readonly genreNames?: string[],
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}
}
