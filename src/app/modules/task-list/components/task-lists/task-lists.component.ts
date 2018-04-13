import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';
import { TaskListsService } from '../../../shared/services/task-lists.service';

@Component({
    selector: 'app-task-lists',
    templateUrl: './task-lists.component.html'
})
export class TaskListsComponent implements OnInit {
    taskLists?: TaskList[];

    constructor(
        private _tasksListsService: TaskListsService
    ) {
    }

    ngOnInit() {
        this.loadAllTaskLists();
    }

    loadAllTaskLists() {
        this._tasksListsService
            .getTaskLists()
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
