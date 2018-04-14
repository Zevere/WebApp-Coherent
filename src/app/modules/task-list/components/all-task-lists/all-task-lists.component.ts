import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';
import { TaskListService } from '../../../shared/services/task-list.service';

@Component({
    selector: 'app-all-task-lists',
    templateUrl: './all-task-lists.component.html'
})
export class AllTaskListsComponent implements OnInit {
    taskLists?: TaskList[];

    constructor(
        private _tasksListsService: TaskListService
    ) {
    }

    ngOnInit() {
        this.loadAllTaskLists();
    }

    loadAllTaskLists() {
        this._tasksListsService
            .getAllTaskLists(null) // ToDo pass user id from route params
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
