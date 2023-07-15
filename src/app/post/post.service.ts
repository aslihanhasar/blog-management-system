import { Injectable } from '@angular/core';
import { Post } from './post';
import { posts } from 'src/assets/postpool';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  getPosts():Post[]{
    return posts;
  }

  constructor() { }

   getUserProperties(): string[] {
    return Object.keys(posts[0]);
  }

}