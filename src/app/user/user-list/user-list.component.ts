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

  username: string= "";
  email: string= "";
  creationDate: string="";
  isActive: boolean=false;
  updateMode: boolean=false;
  userId: Number=0;

  constructor(private userService:UserService){}

  ngOnInit(): void {
      this.users=this.userService.getUsers();
      this.tableColumns=this.userService.getUserProperties();
  }

  performDelete($event: Number){
    if(this.userService.getUserCount() === 1)
      alert("Error. End user can not be deleted.")
    /*else if (this.checkPostsAndComments($event) === true)
      alert("You cannot delete a user with post or comment");
      */
    else {
      this.userService.deleteUser($event);
      this.users=this.userService.getUsers();
  }
  }

  performUpdate($event: Number):void{
    this.updateMode = true;
    this.userId = $event;
  }

  performSave(){

    if(this.username == '' || this.email == '' || this.creationDate == '')
    alert("All information must be filled.");
    else if(this.userService.isDataUnique(this.username,this.email,this.userId) === false)
    alert("Username or email not unique.");
    else {
    const user: User = {
      userId: this.userId,
      username: this.username ,
      email: this.email ,
      creationDate: this.creationDate ,
      isActive: this.isActive
    }
    this.userService.updateUser(user, this.userId);
    this.users = this.userService.getUsers();
    this.performCancel();
  } 
 }
  
  performCancel(): void {
    this.updateMode= false;
    this.username = "";
    this.email = "";
    this.creationDate = "";
    this.userId = 0;
  }
  
}
