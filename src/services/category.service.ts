import {Category} from '../entities/category.entity';

export async function getCategories() {
  const categories: Category[] = await Category.find();
  return categories;
}
