import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  tableColumns: string[] = [];

  constructor(
    private categoryService: CategoryService,
  ) {
    if (this.categoryService.getCategories().length == 0) {
      const newCategories: Category[] = [];
      this.categoryService.setCategories(newCategories);
    }
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.tableColumns = this.categoryService.getPostProperties();
  }

  performDelete($event:Number){
  
  }

  performDetails($event:Number){

  }

}
