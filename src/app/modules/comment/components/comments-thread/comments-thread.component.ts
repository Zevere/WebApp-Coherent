import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../shared/models/comment';

@Component({
    selector: 'app-comments-thread',
    templateUrl: './comments-thread.component.html'
})
export class CommentsThreadComponent implements OnInit {
    @Input() comments: Comment[];
    @Input() allowPost: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
