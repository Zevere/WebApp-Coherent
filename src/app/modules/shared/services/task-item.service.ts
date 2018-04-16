import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { from } from 'rxjs/observable/from';
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
        return from([testTaskItems]);

        /*
        return this._http
            .post(`/zv/graphql`, {
                query: `{
                  user(userId: "bobby") {
                    lists {
                      id title createdAt
                      tasks {
                          id
                          title
                          description
                          due
                          projectTags
                          createdAt
                      }
                    }
                  }
                }`
            })
            .do(throwIfHasErrors)
            .map<any, TaskList[]>(res => res.data.user.lists);
        */
    }

    update(taskUpdates: TaskItem) {
        const actualTask = testTaskItems.filter(t => t.id === taskUpdates.id)[0];
        const actualTags = new TaskItemTags(actualTask.tags);

        actualTask.title = taskUpdates.title;
        actualTask.description = taskUpdates.description;
        actualTask.updatedAt = new Date();

        const tagUpdates = new TaskItemTags(taskUpdates.tags || []);
        if (actualTags.stage !== tagUpdates.stage) {
            actualTask.tags = actualTask.tags.filter((tag: string) => !tag.startsWith('_stage:'));
            actualTask.tags.push(`_stage:${tagUpdates.stage}`);
        }
        return from([actualTask]);
    }
}

function throwIfHasErrors(response: any) {
    if (response.errors && response.errors.length) {
        throw new Error(response.errors[0].message);
    }
}
