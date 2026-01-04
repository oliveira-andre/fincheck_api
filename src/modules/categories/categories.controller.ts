import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ActiveUserId } from '../../../src/shared/decorators/activeUserId';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // TODO: implement create category
  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }

  // TODO: implement find one category
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // TODO: implement update category
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  // TODO: implement delete category
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
