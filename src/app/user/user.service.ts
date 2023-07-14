import { Injectable } from '@angular/core';
import { User } from './user';
import { users } from 'src/assets/userpool';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users:User[]=[]

  getUsers():User[]{
    return users;
  }

  constructor() { }

   getUserProperties(): string[] {
    return Object.keys(users[0]);
  }
 
  deleteUser(id: Number):void {
    const index = users.findIndex(u => u.userId === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }
  getUserById(id: Number): User | undefined {
    return users.find(u => u.userId === id);
  }

  getUserByUsername(username: string): User| undefined{
    return users.find(u=> u.username === username )
  }

  getUserByEmail(email: string): User| undefined{
    return users.find(u=> u.email === email )
  }

  updateUser(updatedUser: User, id: Number): void {
    this.users = this.users.map(u => {
      if(u.userId === id)
        u=updatedUser
      return u;
    });  
  }

  
}
