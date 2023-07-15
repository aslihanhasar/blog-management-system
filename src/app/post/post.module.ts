import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostDetailComponent } from './post-detail/post-detail.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostAddComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostModule { }
