import { Component,OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  tableColumns:string[]=[];

  constructor(private postService:PostService ) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.tableColumns = ['Post ID', 'Title', 'View Count', 'Creation Date', 'Published'];
  }

}
