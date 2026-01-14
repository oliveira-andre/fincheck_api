import { TransactionType } from "src/modules/transactions/entities/Transaction";

export class CreateCategoryDto {
  name: string;
  icon: string;
  type: TransactionType;
  bankAccountId?: string | null | undefined;
}
