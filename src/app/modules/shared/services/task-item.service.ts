import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { from } from 'rxjs';
import { testTaskItems, testTaskLists } from '../test-data';
import { TaskList } from '../models/task-list';
import { TaskItem } from '../models/task-item';
import { TaskItemTags } from '../models/task-item-tags';

@Injectable()
export class TaskItemService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getTaskItem(userId: string, listId: string, taskId: string) {
        return from(testTaskItems.filter(task => task.id === taskId && task.list === listId))
            .map(task => <TaskItem>Object.assign({}, task));
    }

    get(id: string) {
        return from(testTaskItems
            .filter(task => task.id === id)
            .map(task => <TaskItem>Object.assign({}, task))
        );
    }

    getAllTaskItems(userId: string, listId: string) {
        return from([
            testTaskItems
                .filter(task => task.list === listId)
                .reduce<TaskItem[]>((prev: TaskItem[], curr: TaskItem) => {
                    prev.push(Object.assign({}, curr));
                    return prev;
                }, [])
        ]);
    }

    update(taskUpdates: TaskItem) {
        const actualTask = testTaskItems.filter(t => t.id === taskUpdates.id)[0];
        const actualTags = new TaskItemTags(actualTask.tags);

        actualTask.title = taskUpdates.title;
        actualTask.description = taskUpdates.description;
        actualTask.updatedAt = new Date();

        const tagUpdates = new TaskItemTags(taskUpdates.tags || []);
        actualTask.tags = actualTask.tags || [];
        if (actualTags.stage !== tagUpdates.stage) {
            actualTask.tags = actualTask.tags.filter((tag: string) => !tag.startsWith('_stage:'));
            actualTask.tags.push(`_stage:${tagUpdates.stage}`);
        }
        return from([Object.assign({}, actualTask)]);
    }
}

function throwIfHasErrors(response: any) {
    if (response.errors && response.errors.length) {
        throw new Error(response.errors[0].message);
    }
}
