import { IsEnum, IsNotEmpty, IsNumber, IsString, IsDateString, MaxLength, IsPositive, IsUUID } from "class-validator";
import { TransactionType } from "../entities/Transaction";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
