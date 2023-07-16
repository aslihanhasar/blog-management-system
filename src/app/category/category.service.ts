import { Injectable } from '@angular/core';
import { Category } from './category';
import { categories } from 'src/assets/categorypool';
import { PostService } from '../post/post.service';
import { Post } from '../post/post';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategories(): Category[] {
    return categories;
  }

  setCategories(newCategories: Category[]): void {
    categories.length = 0;
    categories.push(...newCategories);
  }  

  constructor(private postService: PostService) { }

  getPostProperties(): string[] {
    return Object.keys(categories[0]);
  }

  getCategoryById(id: Number): Category | undefined {
    return categories.find((category) => category.categoryId === Number(id))
  }

  getCategoryByName(name: string) {
    return categories.find((category) => category.name === name)
  }

  isCategoryUnique(name: string, id: Number): boolean {
    const lowerCaseCategoryName = name.toLowerCase();

    const duplicateCategoryName = this.getCategories().find((category) => category.name.toLowerCase() === lowerCaseCategoryName && category.categoryId !== id);

    return !duplicateCategoryName;
  }

  updateCategory(updatedCategory: Category, id: Number): void {
    const index = categories.findIndex(c => c.categoryId === id);
    if (index !== -1) {
      categories[index] = updatedCategory;
    }
  }

  generateCategoryId(): Number {
    const categories = this.getCategories();
    const lastCategory = categories[categories.length - 1];
    const newCategoryId = +lastCategory.categoryId + 1;
    return newCategoryId;
  }

  addCategory(category: Category): void {
    const newCategoryId = this.generateCategoryId();
    category.categoryId = newCategoryId;
    categories.push(category);
  }

  deleteCategory(categoryId: Number): void {
    if (this.postService.getPosts().some(post => post.categoryId === categoryId)) {
      alert("You cannot delete a category with posts");
    } else {
      const index = categories.findIndex(category => category.categoryId === categoryId);
      if (index !== -1) {
        categories.splice(index, 1);
      }
    }
  }

}
