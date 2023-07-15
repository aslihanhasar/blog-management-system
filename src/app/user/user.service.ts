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
 
  getUserById(id: Number): User | undefined {
    return this.getUsers().find(u => u.userId === id);
  }

  getUserByUsername(username: string): User| undefined{
    return this.getUsers().find(u=> u.username === username )
  }

  getUserByEmail(email: string): User| undefined{
    return this.getUsers().find(u=> u.email === email )
  }

  deleteUser(id: Number):void {
    const index = users.findIndex(u => u.userId === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }

  updateUser(updatedUser: User, id: Number): void {
    const index = users.findIndex(u => u.userId === id);
    if (index !== -1) {
      users[index] = updatedUser;
  }
}

  isDataUnique(username: string, email: string, id: Number): boolean {
    const lowerCaseUsername = username.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();

    if(this.getUsers().find((user) => user.username.toLowerCase()!==undefined && this.getUserByUsername(lowerCaseUsername)!.userId !== id)) 
      return false;
    else if(this.getUsers().find((user) => user.email.toLowerCase() !== undefined && this.getUserByEmail(lowerCaseEmail)!.userId !== id))
      return false;
    else
      return true;
  }
}
