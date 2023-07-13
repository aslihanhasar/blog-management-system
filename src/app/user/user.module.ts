import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
