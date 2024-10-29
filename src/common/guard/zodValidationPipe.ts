import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema<any>) {}

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            if (error instanceof ZodError) {
                // console.log(error.errors[0].message);
                throw new BadRequestException(error.errors);
            }
            throw error; // Rethrow unexpected errors
        }
    }
}
