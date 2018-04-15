import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskListService } from '../../../shared/services/task-list.service';
import { TaskItemService } from '../../../shared/services/task-item.service';
import { TaskList } from '../../../shared/models/task-list';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskItemTags } from '../../../shared/models/task-item-tags';
import { TaskListTags } from '../../../shared/models/task-list-tags';

@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html'
})
export class TaskItemComponent implements OnInit {
    taskList: TaskList;
    taskListTags: TaskListTags;
    taskItem: TaskItem;
    taskItemTags: TaskItemTags;

    constructor(
        private _taskListService: TaskListService,
        private _taskItemService: TaskItemService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._route.paramMap
            .subscribe(
                p => {
                    const userId = p.get('userId');
                    const listId = p.get('listId');
                    const taskId = p.get('taskId');

                    this.loadTaskList(userId, listId);
                    this.loadTaskItem(userId, listId, taskId);
                }
            );
    }

    loadTaskList(userId: string, listId: string) {
        this._taskListService
            .getTaskList(userId, listId)
            .subscribe(list => {
                this.taskList = list;
                this.taskListTags = new TaskListTags(list.tags);
            });
    }

    loadTaskItem(userId: string, listId: string, taskId: string) {
        this._taskItemService
            .getTaskItem(userId, listId, taskId)
            .subscribe(task => {
                    this.taskItem = task;
                    this.taskItemTags = new TaskItemTags(task.tags);
                },
                e => {
                    console.warn(e);
                });
    }
}
