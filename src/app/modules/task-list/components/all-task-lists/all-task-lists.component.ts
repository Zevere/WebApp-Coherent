import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';
import { TaskListService } from '../../../shared/services/task-list.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-my-task-lists',
    templateUrl: './all-task-lists.component.html'
})
export class AllTaskListsComponent implements OnInit {
    taskLists?: TaskList[];

    constructor(
        private _authService: AuthService,
        private _tasksListsService: TaskListService
    ) {
    }

    ngOnInit() {
        this.loadAllTaskLists();
    }

    loadAllTaskLists() {
        this._tasksListsService
            .getAllTaskLists(this._authService.user.id)
            .subscribe(
                lists => {
                    this.taskLists = lists;
                },
                e => {
                    console.warn(e);
                }
            );
    }
}
