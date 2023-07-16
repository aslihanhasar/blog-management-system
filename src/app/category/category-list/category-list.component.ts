import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    this.categoryService.deleteCategory($event);
    this.categories=this.categoryService.getCategories();

  }

  performDetails($event:Number){
    this.router.navigate(['categorylist', $event]);
  }

}
