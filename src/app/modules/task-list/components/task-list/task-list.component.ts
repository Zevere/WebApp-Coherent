import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskListService } from '../../../shared/services/task-list.service';
import { TaskList } from '../../../shared/models/task-list';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

    taskList: TaskList;
    icon: string;
    tags: string[];

    constructor(
        private _taskListService: TaskListService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._activatedRoute
            .paramMap
            .subscribe(
                params => {
                    this.getTaskList(params.get('userId'), params.get('listId'));
                }
            );
    }

    private getTaskList(userId: string, listId: string) {
        this._taskListService
            .getTaskList(userId, listId)
            .subscribe(
                taskList => {
                    this.taskList = taskList;
                    this.parseTags();
                },
                e => {
                    console.warn(e);
                }
            );
    }

    private parseTags() {
        // ToDo iterate array once

        this.tags = this.taskList
            .tags
            .map((t: string) => t.substr(t.indexOf(':') + 1));

        this.icon = this.taskList
            .tags
            .filter((t: string) => t.startsWith('_icon:'))
            .map((t: string) => t.substr(6))
            [0];
    }
}
