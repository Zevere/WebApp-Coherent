import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskListService } from '../../../shared/services/task-list.service';
import { TaskList } from '../../../shared/models/task-list';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
    taskList: TaskList;
    isCurrentUserOwner: boolean;
    icon: string;

    constructor(
        private _authService: AuthService,
        private _taskListService: TaskListService,
        private _route: ActivatedRoute,
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

    /**
     * Makes a task list deletion request for the current list
     */
    delete() {
        this._taskListService
            .deleteList(this.taskList.owner, this.taskList.id)
            .subscribe(
                () => {
                    this._router.navigate(['..'], {relativeTo: this._route.parent});
                },
                e => {
                    console.warn(e);
                }
            );
    }

    /**
     * Loads the task list based on the route parameters
     */
    private getTaskList(userId: string, listId: string) {
        this._taskListService
            .getTaskList(userId, listId)
            .subscribe(
                taskList => {
                    this.taskList = taskList;
                    this.parseTags();
                    this.isCurrentUserOwner = this._authService.user.id === this.taskList.owner;
                },
                e => {
                    console.warn(e);
                }
            );
    }

    private parseTags() {
        if (this.taskList.tags && this.taskList.tags.length) {
            this.icon = this.taskList
                .tags
                .filter((t: string) => t.startsWith('_icon:'))
                .map((t: string) => t.substr(6))
                [0];
        }
    }
}
