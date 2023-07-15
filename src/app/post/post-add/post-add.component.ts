import { Component } from '@angular/core';
import { Post } from '../post';
import { User } from 'src/app/user/user';
import { PostService } from '../post.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {

  post: Post = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: "",
    content: "",
    viewCount: 0,
    creationDate: "",
    isPublished: false
  };

  users: User[] = [];
  posts: Post[] = [];

  
  constructor(private postService: PostService, private router: Router, private userService: UserService){
    if (this.userService.getUsers().length === 0){
      const newUsers:User[]=[];
      this.userService.setUsers(newUsers);
    }
    else
      this.users = this.userService.getUsers();
  }

  performSave(){
    this.post.postId = this.postService.generatePostId();
    this.postService.addPost(this.post);
    this.posts = this.postService.getPosts();
    this.router.navigateByUrl('/posts');
  }

  performCancel(){
    this.router.navigateByUrl("/posts");
  }
}
