export class UpdateBookCommand {
    constructor(
        public readonly id: number,
        public readonly bookName?: string,
        public readonly category?: string,
        public readonly authorId?: number,
        public readonly pages?: number,
        public readonly summary?: string,
        public readonly published?: Date,
        public readonly genreIds?: number[],
    ) {}
}
