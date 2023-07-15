import { Component } from '@angular/core';
import { User } from '../user';

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

  

}
