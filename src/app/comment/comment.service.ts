import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { comments } from 'src/assets/commentpool';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  getCommentProperties(): string[] {
    return Object.keys(comments[0]);
  }

  getComments():Comment[]{
    return comments;
  }

  setComments(newComments: Comment[]): void {
    comments.length = 0;
    comments.push(...newComments);
  }

  addComment(comment: Comment) {
    comments.push(comment);
  }

  deleteComment($event: Number):void {
    const index = comments.findIndex(c => c.commentId ===$event);
    if (index !== -1) {
      comments.splice(index, 1);
    }
  }

  generateCommentId(): Number {
    const comments = this.getComments();
    const lastComment = comments[comments.length - 1];
    const newCommentId = +lastComment.commentId + 1;
    return newCommentId;
  }
  
}
