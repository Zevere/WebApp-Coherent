import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../shared/models/comment';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;

    constructor() {
    }

    ngOnInit() {
    }

}
