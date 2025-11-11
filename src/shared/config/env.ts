import { plainToInstance } from 'class-transformer';
import { IsString, IsNotEmpty, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  databaseUrl: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('undefined')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}