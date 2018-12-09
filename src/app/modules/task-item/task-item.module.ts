import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AllTaskItemsComponent } from './components/all-task-items/all-task-items.component';
import { CommentModule } from '../comment/comment.module';
import { TaskItemCardComponent } from './components/task-item-card/task-item-card.component';
import { NewTaskItemComponent } from './components/new-task-item/new-task-item.component';

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
        NewTaskItemComponent,
        TaskItemCardComponent,
    ],
    exports: [
        AllTaskItemsComponent,
        NewTaskItemComponent,
    ]
})
export class TaskItemModule {
}
