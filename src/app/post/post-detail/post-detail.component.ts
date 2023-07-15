import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{
  post: Post | undefined;
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.posts = this.postService.getPosts();
      const id = params['id'];
      const postId = parseInt(id, 10);
      this.post = this.posts.find(post => post.postId === postId)!;
    });
  }

  

}
