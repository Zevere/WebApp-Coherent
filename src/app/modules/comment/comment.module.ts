import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommentsThreadComponent } from './components/comments-thread/comments-thread.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        CommentsThreadComponent,
        CommentComponent
    ],
    exports: [
        CommentsThreadComponent
    ]
})
export class CommentModule {
}
