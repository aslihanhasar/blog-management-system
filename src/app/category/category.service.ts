import { Injectable } from '@angular/core';
import { Category } from './category';
import { categories } from 'src/assets/categorypool';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategories():Category[]{
    return categories;
  }

  setCategories(newCategories: Category[]): void {
    categories.length = 0;
    categories.push(...newCategories);
  }

  constructor() { }

   getPostProperties(): string[] {
    return Object.keys(categories[0]);
  }
}
