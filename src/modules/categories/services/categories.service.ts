import { Injectable } from '@nestjs/common';

import { CategoriesRepository } from '../../../../src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepo: CategoriesRepository,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}

  async findAllByUserId(userId: string, bankAccountId?: string | null | undefined) {
    if (!bankAccountId) {
      bankAccountId = undefined;
    } else {
      await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);
    }

    return this.categoriesRepo.findMany({
      where: { userId, bankAccountId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name, icon, type, bankAccountId } = createCategoryDto;

    if (bankAccountId) {
      await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);
    }

    return this.categoriesRepo.create({
      data: {
        userId,
        name,
        icon,
        type,
        bankAccountId,
      },
    });
  }

  async update(userId: string, categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, icon, type, bankAccountId } = updateCategoryDto;

    await this.validateEntitiesOwnership({ userId, categoryId });

    if (bankAccountId) {
      await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);
    }

    return this.categoriesRepo.update({
      where: { id: categoryId },
      data: {
        name,
        icon,
        type,
        bankAccountId,
      },
    });
  }

  async remove(userId: string, categoryId: string) {
    await this.validateEntitiesOwnership({ userId, categoryId });

    await this.categoriesRepo.delete({
      where: { id: categoryId },
    });

    return null;
  }

  private async validateEntitiesOwnership({ userId, categoryId }: { userId: string, categoryId: string }) {
    await Promise.all([
      categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
