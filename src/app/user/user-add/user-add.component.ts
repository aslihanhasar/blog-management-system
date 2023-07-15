import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  user: User = {
    userId: 0,
    username:"",
    email: "",
    creationDate:"",
    isActive: false
  }

  constructor(private userService: UserService) {}

  performCreate(){
    if (this.user.username === '' || this.user.email === '' || this.user.creationDate === '') {
      alert('All information must be filled.');
      return;
    }
    const newUser: User = {
      userId: this.userService.generateUserId(),
      username: this.user.username,
      email: this.user.email,
      creationDate: this.user.creationDate,
      isActive: this.user.isActive
    };

    if (!this.userService.isDataUnique(this.user.username, this.user.email, newUser.userId)) {
      alert('Username or email already exist.');
      return;
    }

    this.userService.addUser(newUser);
  }

  performCancel(){

  }



}
