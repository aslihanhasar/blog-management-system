import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{
  post: Post | undefined;
  posts: Post[] = [];
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService:UserService
  )
   {
    if (this.userService.getUsers().length === 0)
    {
      const newUsers:User[]=[];
      this.userService.setUsers(newUsers);
    }
    else
      this.users = this.userService.getUsers();
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.posts = this.postService.getPosts();
      const id = params['id'];
      const postId = parseInt(id, 10);
      this.post = this.posts.find(post => post.postId === postId)!;
    });
  }

  

  

}
