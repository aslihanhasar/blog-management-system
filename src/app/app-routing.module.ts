import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { PostListComponent } from './post/post-list/post-list.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
