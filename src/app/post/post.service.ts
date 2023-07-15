import { Injectable } from '@angular/core';
import { Post } from './post';
import { postpool } from 'src/assets/postpool';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];

  constructor() {}

  getPosts(): Post[] {
    return this.posts;
  }

  setPosts(): void {
    this.posts = postpool;
  }
}