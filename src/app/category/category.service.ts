import { Injectable } from '@angular/core';
import { Category } from './category';
import { categories } from 'src/assets/categorypool';
import { PostService } from '../post/post.service';
import { Post } from '../post/post';
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

  constructor(private postService: PostService) { }

   getPostProperties(): string[] {
    return Object.keys(categories[0]);
  }

  deleteCategory($event: Number) {
    if (this.postService.getPosts().length === 0){
      const newPosts: Post[] = [];
      this.postService.setPosts(newPosts);
    }
    if (this.postService.getPosts().length > 0 && this.postService.getPosts().some(post => post.categoryId === $event)) {
      alert("You cannot delete a category with posts");
    } else {
      let dataCategories=this.getCategories() ;
      dataCategories=categories.filter(category => category.categoryId !== $event);
    }
}
}
