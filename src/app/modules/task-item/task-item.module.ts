import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AllTaskItemsComponent } from './components/all-task-items/all-task-items.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        AllTaskItemsComponent,
        TaskItemComponent,
    ],
    exports: [
        AllTaskItemsComponent,
        TaskItemComponent,
    ]
})
export class TaskItemModule {
}
