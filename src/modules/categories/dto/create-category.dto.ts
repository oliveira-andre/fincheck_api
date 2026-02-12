import { TransactionType } from "src/modules/transactions/entities/Transaction";
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsEnum, IsUUID } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsString()
  @IsOptional()
  @IsUUID()
  bankAccountId?: string | null | undefined;
}
