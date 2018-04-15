import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { TaskListService } from './services/task-list.service';
import { TaskItemService } from './services/task-item.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        AuthService,
        TaskListService,
        TaskItemService,
    ],
    exports: []
})
export class SharedModule {
}
