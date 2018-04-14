import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TaskListCardComponent } from './components/task-list-card/task-list-card.component';
import { AllTaskListsComponent } from './components/all-task-lists/all-task-lists.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { CommentModule } from '../comment/comment.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        CommentModule
    ],
    declarations: [
        TaskListCardComponent,
        AllTaskListsComponent,
        TaskListComponent
    ]
})
export class TaskListModule {
}
