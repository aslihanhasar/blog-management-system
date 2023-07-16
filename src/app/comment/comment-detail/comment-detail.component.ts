import { Component,OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent {
  comment:Comment | undefined;
  comments: Comment[] = [];

  constructor(private commentService: CommentService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.comments = this.commentService.getComments();
      const id = params['id'];
      const commentId = parseInt(id, 10);
      this.comment = this.comments.find(comment => comment.commentId === commentId)!;
    });
  }
}
