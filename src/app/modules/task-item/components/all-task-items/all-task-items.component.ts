import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskListService } from '../../../shared/services/task-list.service';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskItemService } from '../../../shared/services/task-item.service';

@Component({
    selector: 'app-all-task-items',
    templateUrl: './all-task-items.component.html'
})
export class AllTaskItemsComponent implements OnInit {
    taskItems: TaskItem[];

    constructor(
        private _taskListService: TaskListService,
        private _taskItemService: TaskItemService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._route
            .paramMap
            .subscribe(p => {
                    const userId = p.get('userId');
                    const listId = p.get('listId');
                    this.loadTaskItems(userId, listId);
                },
                e => {
                    console.warn(e);
                }
            );
    }

    loadTaskItems(userId: string, listId: string) {
        this._taskItemService
            .getAllTaskItems(userId, listId)
            .subscribe(
                items => {
                    this.taskItems = items;
                },
                e => {
                    console.warn(e);
                }
            );
    }

    navigateBackToList() {
        this._router.navigate(['..'], {relativeTo: this._route.parent});
    }
}
