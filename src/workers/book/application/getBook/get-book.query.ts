export class GetBooksQuery {
    constructor(
        public readonly search?: string,
        public readonly page?: number,
    ) {}
}
