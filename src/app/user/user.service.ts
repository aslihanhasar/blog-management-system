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

  getUserCount(): number {
    return users.length ;
    
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

    const duplicateUsername = this.getUsers().find((user) => user.username.toLowerCase() === lowerCaseUsername && user.userId !== id);
    const duplicateEmail = this.getUsers().find((user) => user.email.toLowerCase() === lowerCaseEmail && user.userId !== id);

    return !duplicateUsername && !duplicateEmail;
  }
}
