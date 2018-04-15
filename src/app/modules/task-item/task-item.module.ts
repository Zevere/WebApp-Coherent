import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AllTaskItemsComponent } from './components/all-task-items/all-task-items.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AllProjectTasksComponent } from './components/all-project-tasks/all-project-tasks.component';
import { ProjectTaskItemCardComponent } from './components/project-task-item-card/project-task-item-card.component';
import { EditProjectTaskItemComponent } from './components/edit-project-task-item/edit-project-task-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        AllTaskItemsComponent,
        TaskItemComponent,
        AllProjectTasksComponent,
        ProjectTaskItemCardComponent,
        EditProjectTaskItemComponent,
    ],
    exports: [
        AllTaskItemsComponent,
        TaskItemComponent,
    ]
})
export class TaskItemModule {
}
