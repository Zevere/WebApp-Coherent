import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { TaskListService } from './services/task-list.service';
import { TaskItemService } from './services/task-item.service';
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        AuthService,
        UserService,
        TaskListService,
        TaskItemService,
    ],
    exports: []
})
export class SharedModule {
}
