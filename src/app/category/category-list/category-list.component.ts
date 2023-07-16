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

  name: string = "";
  creationDate: string = "";
  categoryId: Number = 0;
  addCategoryForm: boolean = false;

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
    this.pageChanged(this.currentPage);
  }


  performDetails($event: Number) {
    this.router.navigate(['categorylist', $event]);
  }

  performAddCategory() {
    this.addCategoryForm = !this.addCategoryForm;
  }

  performSave() {

    if (this.name === '' || this.creationDate === '') {
      alert('All information must be filled.');
    } else if (!this.categoryService.isCategoryUnique(this.name, this.categoryId)) {
      alert('Category already exists.');
    } else {
      const newCategoryId = this.categoryService.generateCategoryId();
      const category: Category = {
        categoryId: newCategoryId,
        name: this.name,
        creationDate: this.creationDate
      };

      this.categoryService.addCategory(category);
      this.pageChanged(this.currentPage);
      this.categories = this.categoryService.getCategories();
      this.addCategoryForm = false;
      this.performCancel();

    }
  }

  performCancel() {
    this.addCategoryForm = false;
    this.name = "";
    this.creationDate = "";
    this.categoryId = 0;
  }

}
