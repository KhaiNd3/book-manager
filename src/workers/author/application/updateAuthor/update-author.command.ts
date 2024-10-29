export class UpdateAuthorCommand {
    constructor(
        public readonly id: number,
        public readonly authorName: string,
        public readonly description?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}
}
