import { IsString, IsNotEmpty, MaxLength, IsNumber, Min, IsHexColor, IsEnum } from "class-validator";
import { BankAccountType } from "../entities/bankAccount";

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)	
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
