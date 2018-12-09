import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskItemService } from '../../../shared/services/task-item.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-all-task-items',
    templateUrl: './all-task-items.component.html'
})
export class AllTaskItemsComponent implements OnInit {
    taskItems: TaskItem[];
    ownerId: string;
    listId: string;
    isOwner: boolean;
    isSending: boolean;

    constructor(
        private _taskItemService: TaskItemService,
        private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._route
            .paramMap
            .subscribe(p => {
                    this.ownerId = p.get('userId');
                    this.listId = p.get('listId');

                    this.loadTaskItems();
                    this.isOwner = this._authService.user.id === this.ownerId;
                },
                e => {
                    console.warn(e);
                }
            );
    }

    loadTaskItems() {
        this._taskItemService
            .getAllTaskItems(this.ownerId, this.listId)
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

    deleteTask(taskId: string) {
        if (this.isSending) {
            return;
        }
        this.isSending = true;

        this._taskItemService
            .deleteTask(this.ownerId, this.listId, taskId)
            .subscribe(
                () => {
                    this.taskItems = this.taskItems
                        .filter(t => t.id !== taskId);
                    this.isSending = false;
                },
                e => {
                    console.warn(e);
                    this.isSending = false;
                }
            );
    }
}
