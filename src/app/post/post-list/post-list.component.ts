import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  tableColumns: string[] = [];
  pagedData: Post[] = [];
  currentPage = 1;
  dataPerPage = 10;
  userId: Number | null = null;
  postId: Number | null = null;
  categoryId: Number | null = null;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.postService.getPosts().length == 0) {
      const newPosts: Post[] = [];
      this.postService.setPosts(newPosts);
    }
    this.posts = this.postService.getPosts();
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.tableColumns = ['Post ID', 'Title', 'View Count', 'Creation Date', 'Published'];
  
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] ? +params['userId'] : null;
      this.postId = params['postId'] ? +params['postId'] : null;
      this.categoryId = params['categoryId'] ? +params['categoryId'] : null;
  
      if (this.userId !== null || this.postId !== null || this.categoryId !== null) {
        this.filterPosts();
      }
  
      this.pageChanged(this.currentPage);
    });
  }
  
  performDelete($event: Number): void {
    this.postService.deletePost($event);
    this.posts = this.postService.getPosts();
    this.pageChanged(this.currentPage);
  }

  performDetail($event: Number): void {
    this.router.navigate(["/postlist/", $event]);
  }

  pageChanged(page: number): void {
    const startIndex = (page - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.pagedData = this.posts.slice(startIndex, endIndex);
    this.currentPage = page;
    if (this.pagedData.length === 0 && this.currentPage > 1){
      this.previousPage();
    }
      this.updateParam();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.dataPerPage);
  }

  filterPosts(): void {
    this.pagedData = this.posts.filter(post => {
      let filter = true;
      if (this.userId !== null && post.userId !== this.userId) filter = false;
      if (this.postId !== null && post.postId !== this.postId) filter = false;
      if (this.categoryId !== null && post.categoryId !== this.categoryId) filter = false;
      return filter;
    });
    this.updateParam();
  }  

  clearFilters(): void {
    this.userId = null;
    this.postId = null;
    this.categoryId = null;
    this.currentPage = 1;
    this.pageChanged(this.currentPage);
    this.updateParam();
  }

  updateParam(): void {
    const queryParams: Params = {};
    if (this.userId !== null) {
      queryParams['userId'] = this.userId.toString();
    }
    if (this.postId !== null) {
      queryParams['postId'] = this.postId.toString();
    }
    if (this.categoryId !== null) {
      queryParams['categoryId'] = this.categoryId.toString();
    }
    this.router.navigate([], { queryParams });
  }
  
}


