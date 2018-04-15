import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AllTaskItemsComponent } from './components/all-task-items/all-task-items.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { ProjectTasksComponent } from './components/project-tasks/project-tasks.component';
import { TaskItemCardComponent } from './components/task-item-card/task-item-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations: [
        AllTaskItemsComponent,
        TaskItemComponent,
        ProjectTasksComponent,
        TaskItemCardComponent,
    ],
    exports: [
        AllTaskItemsComponent,
        TaskItemComponent,
    ]
})
export class TaskItemModule {
}
