import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from '../../../../src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';
import { TransactionType } from 'src/modules/transactions/entities/Transaction';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          }
        },
      }
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce((acc, transaction) => {
        return acc + (transaction.type === TransactionType.INCOME ? transaction.value : -transaction.value);
      }, 0);

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance: currentBalance,
      }
    });
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    const { name, initialBalance, type, color } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: { name, initialBalance, type, color },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
