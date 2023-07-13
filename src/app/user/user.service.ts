import { Injectable } from '@angular/core';
import { User } from './user';
import { users } from 'src/assets/userpool';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  getUsers():User[]{
    return users;
  }

  constructor() { }

   getUserProperties(): string[] {
    return Object.keys(users[0]);
  }
  
}
