import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AllTaskItemsComponent } from './components/all-task-items/all-task-items.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AllProjectTasksComponent } from './components/all-project-tasks/all-project-tasks.component';
import { ProjectTaskItemCardComponent } from './components/project-task-item-card/project-task-item-card.component';
import { EditProjectTaskItemComponent } from './components/edit-project-task-item/edit-project-task-item.component';
import { CommentModule } from '../comment/comment.module';
import { TaskItemSummaryComponent } from './components/task-item-summary/task-item-summary.component';
import { AllTodoTasksComponent } from './components/all-todo-tasks/all-todo-tasks.component';
import { TodoTaskItemCardComponent } from './components/todo-task-item-card/todo-task-item-card.component';
import { AddTodoTaskItemComponent } from './components/add-todo-task-item/add-todo-task-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        CommentModule,
    ],
    declarations: [
        AllTaskItemsComponent,
        TaskItemComponent,
        AllProjectTasksComponent,
        ProjectTaskItemCardComponent,
        EditProjectTaskItemComponent,
        TaskItemSummaryComponent,
        AllTodoTasksComponent,
        TodoTaskItemCardComponent,
        AddTodoTaskItemComponent,
    ],
    exports: [
        AllTaskItemsComponent,
        TaskItemComponent,
    ]
})
export class TaskItemModule {
}
