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
  pagedData: Category[] = [];
  currentPage = 1;
  dataPerPage = 5;

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
    this.pageChanged(this.currentPage);
  }
  pageChanged(page: number): void {
    const startIndex = (page - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.pagedData = this.categories.slice(startIndex, endIndex);
    this.currentPage = page;
    if (this.pagedData.length === 0 && this.currentPage > 1)
      this.previousPage();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.categories.length / this.dataPerPage);
  }

  performDelete($event: Number) {
    this.categoryService.deleteCategory($event);
    this.categories = this.categoryService.getCategories();

  }

  performDetails($event: Number) {
    this.router.navigate(['categorylist', $event]);
  }

}
