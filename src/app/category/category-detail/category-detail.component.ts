import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { PostService } from 'src/app/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/post/post';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category: Category = {
    categoryId: 0,
    name: '',
    creationDate: '',
  };
  postCount: number = 0;
  updateMode: boolean = false;
  updatedName: string = '';
  updatedCreationDate: string = '';

  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      const category = this.categoryService.getCategoryById(Number(id));
      if (category) {
        this.category = category;
        if (this.postService.getPosts().length === 0) {
          const newPosts: Post[] = []; 
          this.postService.setPosts(newPosts);
        }
        this.postCount = this.postService.getPosts().filter(post => post.categoryId === Number(id)).length;
      } else {
        alert('Invalid category.')
      }
    });
  }
  

  performEdit() {
    this.updateMode = !this.updateMode;
    this.updatedName = this.category.name;
    this.updatedCreationDate = this.category.creationDate;
  }

  performSave() {
    const updatedCategory: Category = {
      categoryId: this.category.categoryId,
      name: this.updatedName,
      creationDate: this.updatedCreationDate,
    };
    this.categoryService.updateCategory(updatedCategory, this.category.categoryId);
    this.router.navigateByUrl('/category');
  }

  performCancel() {
    this.updateMode = false;
    this.updatedName = '';
    this.updatedCreationDate = '';
  }
}
