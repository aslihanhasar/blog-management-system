import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import { CommentDetailComponent } from './comment/comment-detail/comment-detail.component';


const routes: Routes = [
  {
    path:"users",component:UserListComponent
  },
  {
    path: "adduser", component: UserAddComponent
  },
  {
    path: "posts", component: PostListComponent
  },
  {
    path: "postadd", component: PostAddComponent
  },
  {
    path: "postlist/:id", component: PostDetailComponent
  },
  {
    path: "category", component: CategoryListComponent
  },
  {
    path: "categorylist/:id", component: CategoryDetailComponent
  },
  {
    path: "comments", component: CommentListComponent
  },
  {
    path: "addcomment", component: CommentAddComponent
  },
  {path: "commentlist/:id", component: CommentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
