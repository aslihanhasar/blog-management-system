import { Component } from '@angular/core';
import { Comment } from '../comment';
import { Post } from 'src/app/post/post';
import { User } from 'src/app/user/user';
import { CommentService } from '../comment.service';
import { PostService } from 'src/app/post/post.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent {
  comment: Comment = {
    commentId: 0,
    postId: 0,
    userId: 0,
    comment: "",
    creationDate: "",
    isConfirmed: false,
  }

  users: User[] = [];
  posts: Post[] = [];
  comments: Comment[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService,
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
    else
      this.users = this.userService.getUsers();
    this.posts = this.postService.getPosts();
    this.comments = this.commentService.getComments();
  }

  performSave() {
    if (this.comment.postId === 0 ||
      this.comment.userId === 0 ||
      this.comment.creationDate === "" ||
      this.comment.comment === ""){
        alert("All information must be filled");
      }
    
    else{

    }  
    this.comment.commentId = this.commentService.generateCommentId();
    this.commentService.addComment(this.comment);
    this.comments = this.commentService.getComments();
    this.router.navigateByUrl('/comments');
  }

  performCancel() {
    this.router.navigateByUrl("/comments");
  }

}
