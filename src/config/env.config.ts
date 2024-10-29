import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class EnvConfig {
    @IsNumber()
    PORT: number;

    @IsString()
    DATABASE_URL: string;

    @IsString()
    DATABASE_USER: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_HOST: string;

    @IsNumber()
    DATABASE_PORT: number;

    @IsString()
    DATABASE_NAME: string;

    @IsString()
    API_KEY: string;
}

export function validateConfig(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvConfig, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(
            `Config validation error: ${errors.map((err) => JSON.stringify(err.constraints)).join(', ')}`,
        );
    }

    return validatedConfig;
}
