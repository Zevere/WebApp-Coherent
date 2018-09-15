import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskListService } from '../../../shared/services/task-list.service';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskItemService } from '../../../shared/services/task-item.service';
import { TaskList } from '../../../shared/models/task-list';
import { TaskListTags } from '../../../shared/models/task-list-tags';

@Component({
    selector: 'app-all-task-items',
    templateUrl: './all-task-items.component.html'
})
export class AllTaskItemsComponent implements OnInit {
    taskItems: TaskItem[];
    taskList: TaskList;
    taskListTags: TaskListTags;

    constructor(
        private _taskListService: TaskListService,
        private _taskItemService: TaskItemService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._route
            .paramMap
            .subscribe(p => {
                    const userId = p.get('userId');
                    const listId = p.get('listId');
                    this.loadTaskList(userId, listId);
                    this.loadAllTaskItems(userId, listId);
                },
                e => {
                    console.warn(e);
                }
            );
    }

    loadTaskList(userId: string, listId: string) {
        this._taskListService
            .getTaskList(userId, listId)
            .subscribe(
                list => {
                    this.taskList = list;
                    this.taskListTags = new TaskListTags(list.tags);
                },
                e => {
                    console.warn(e);
                }
            );
    }

    loadAllTaskItems(userId: string, listId: string) {
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
}
