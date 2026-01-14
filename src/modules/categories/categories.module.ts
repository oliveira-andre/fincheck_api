import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ValidateCategoryOwnershipService,
    ValidateBankAccountOwnershipService,
  ],
})
export class CategoriesModule {}
