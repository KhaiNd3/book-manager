import { ApiProperty } from '@nestjs/swagger';

export class IdBookDetailResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    bookName: string;

    @ApiProperty()
    category: string;

    @ApiProperty({ type: [Number] })
    genres: string[];

    @ApiProperty({ type: String, format: 'date' })
    createdAt: Date;

    @ApiProperty({ type: String, format: 'date' })
    updatedAt: Date;

    @ApiProperty()
    authorName: string;

    @ApiProperty()
    pages?: number;

    @ApiProperty()
    summary?: string;

    @ApiProperty({ type: String, format: 'date' })
    published?: Date;
}
