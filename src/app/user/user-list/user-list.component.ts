import {Component,OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:User[]=[];
  tableColumns:string[]=[];

  constructor(private userService:UserService){}

  ngOnInit(): void {
      this.users=this.userService.getUsers();
      this.tableColumns=this.userService.getUserProperties();
  }

  performDelete($event: Number){
    this.userService.deleteUser($event);
    this.users=this.userService.getUsers();
  }
}
