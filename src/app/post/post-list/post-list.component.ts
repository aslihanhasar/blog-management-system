import { Component,OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  tableColumns:string[]=[];
  pagedData: Post[] = [];
  currentPage = 1;
  dataPerPage = 10;

  constructor(
    private postService:PostService,
    private router:Router ) 
    {
      if(this.postService.getPosts().length==0){
        const newPosts:Post[]=[];
        this.postService.setPosts(newPosts);
      }
      this.posts = this.postService.getPosts();
    }

    ngOnInit() {
      this.posts = this.postService.getPosts();
      this.tableColumns = ['Post ID', 'Title', 'View Count', 'Creation Date', 'Published'];
      this.pageChanged(this.currentPage);
    }

  performDelete($event:Number):void{
    this.postService.deletePost($event);
    this.posts=this.postService.getPosts();
    this.pageChanged(this.currentPage);
  }

  performDetail($event:Number):void{
    this.router.navigate(["/postlist/", $event]);
  }

  pageChanged(page: number): void {
    const startIndex = (page - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.pagedData = this.posts.slice(startIndex, endIndex);
    this.currentPage = page;
    if (this.pagedData.length === 0 && this.currentPage > 1)
      this.previousPage();
  }

  previousPage(): void {
    if (this.currentPage > 1)
    {
      this.currentPage--;
      this.pageChanged(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages)
    {
      this.currentPage++;
      this.pageChanged(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.dataPerPage);
  }

}
