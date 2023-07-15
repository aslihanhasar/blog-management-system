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

  setPosts(newPosts: Post[]): void {
    posts.length = 0;
    posts.push(...newPosts);
  }

  constructor() { }

   getPostProperties(): string[] {
    return Object.keys(posts[0]);
  }

  getPostById(id: number): Post | undefined {
    return this.getPosts().find(post => post.postId === id);
  }

  addPost(post: Post) {
    posts.push(post);
  }
  
  deletePost(id: Number):void {
    const index = posts.findIndex(p => p.postId === id);
    if (index !== -1) {
      posts.splice(index, 1);
    }
  }

  generatePostId(): Number {
    const posts = this.getPosts();
    const lastPost = posts[posts.length - 1];
    const newPostId = +lastPost.postId + 1;
    return newPostId;
  }

  updatePost(updatedPost: Post, id: Number){
    const index = posts.findIndex(p => p.postId === id);
    if (index !== -1) {
      posts[index] = updatedPost;
  }
}
}
