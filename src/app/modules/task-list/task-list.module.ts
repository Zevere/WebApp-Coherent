import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TaskListCardComponent } from './components/task-list-card/task-list-card.component';
import { AllTaskListsComponent } from './components/all-task-lists/all-task-lists.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { CommentModule } from '../comment/comment.module';
import { TaskListSummaryComponent } from './components/task-list-summary/task-list-summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        NgbModule.forRoot(),

        SharedModule,
        CommentModule
    ],
    declarations: [
        TaskListCardComponent,
        AllTaskListsComponent,
        TaskListComponent,
        TaskListSummaryComponent
    ]
})
export class TaskListModule {
}
