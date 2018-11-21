import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TaskListCardComponent } from './components/task-list-card/task-list-card.component';
import { AllTaskListsComponent } from './components/all-task-lists/all-task-lists.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { CommentModule } from '../comment/comment.module';
import { TaskListSummaryComponent } from './components/task-list-summary/task-list-summary.component';
import { NewTaskListComponent } from './components/new-task-list/new-task-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        SharedModule,
        CommentModule
    ],
    declarations: [
        TaskListCardComponent,
        AllTaskListsComponent,
        NewTaskListComponent,
        TaskListComponent,
        TaskListSummaryComponent
    ]
})
export class TaskListModule {
}
