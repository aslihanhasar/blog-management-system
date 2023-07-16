import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CommentService } from 'src/app/comment/comment.service';
import { PostService } from 'src/app/post/post.service';
import { Post } from 'src/app/post/post';
import { Comment } from 'src/app/comment/comment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  tableColumns: string[] = [];

  username: string = "";
  email: string = "";
  creationDate: string = "";
  isActive: boolean = false;
  updateMode: boolean = false;
  userId: Number = 0;

  pagedData: User[] = [];
  currentPage = 1;
  dataPerPage = 10;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService) {
    if (this.userService.getUsers().length === 0) {
      const newUsers: User[] = [];
      this.userService.setUsers(newUsers);
    }
    if (this.postService.getPosts().length === 0) {
      const newPosts: Post[] = [];
      this.postService.setPosts(newPosts);
    }
    if (this.commentService.getComments().length === 0) {
      const newComments: Comment[] = [];
      this.commentService.setComments(newComments);
    }
  }


  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.tableColumns = this.userService.getUserProperties();
    this.pageChanged(this.currentPage);

  }


  pageChanged(page: number): void {
    const startIndex = (page - 1) * this.dataPerPage;
    const endIndex = startIndex + this.dataPerPage;
    this.pagedData = this.users.slice(startIndex, endIndex);
    this.currentPage = page;
    if (this.pagedData.length === 0 && this.currentPage > 1)
      this.previousPage();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.dataPerPage);
  }

  checkPostsAndComments(id: Number): boolean {
    if (this.postService.getPosts().filter((post) => post.userId === id).length !== 0)
      return true;
    else if (this.commentService.getComments().filter((comment) => comment.userId === id).length !== 0)
      return true;
    else
      return false;
  }

  performDelete($event: Number) {
    if (this.userService.getUserCount() === 1)
      alert("Error. End user can not be deleted.")
    else if (this.checkPostsAndComments($event) === true)
      alert("Error. Cannot delete user with associated posts or comments");
    else {
      this.userService.deleteUser($event);
      this.users = this.userService.getUsers();
    }
  }

  performUpdate($event: Number): void {
    this.updateMode = true;
    this.userId = $event;
  }

  performSave() {

    if (this.username == '' || this.email == '' || this.creationDate == '')
      alert("All information must be filled.");
    else if (this.userService.isDataUnique(this.username, this.email, this.userId) === false)
      alert("Username or email not unique.");
    else {
      const user: User = {
        userId: this.userId,
        username: this.username,
        email: this.email,
        creationDate: this.creationDate,
        isActive: this.isActive
      }
      this.userService.updateUser(user, this.userId);
      this.users = this.userService.getUsers();
      this.performCancel();
    }
  }

  performCancel(): void {
    this.updateMode = false;
    this.username = "";
    this.email = "";
    this.creationDate = "";
    this.userId = 0;
  }

}
