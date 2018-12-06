import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { testTaskItems } from '../test-data';
import { TaskItem } from '../models/task-item';
import { TaskItemTags } from '../models/task-item-tags';
import { Observable } from 'rxjs/internal/Observable';
import { ensureSuccessResponse } from '../helpers/ensure-success-response';
import { TaskItemInput } from '../../task-item/models/task-item-input';

@Injectable()
export class TaskItemService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getAllTaskItems(userId: string, listId: string): Observable<TaskItem[]> {
        return this._http
            .post('/zv/GraphQL', {
                query: `query GetAllTaskItems($u:String!, $l:String!) {
                    user(userId: $u) {
                        list(listId: $l) { tasks { id title description due tags createdAt } }
                    }
                }`,
                variables: {u: userId, l: listId}
            })
            .pipe(
                map<any, TaskItem[]>(resp => {
                    ensureSuccessResponse(resp);
                    return <TaskItem[]>resp.data.user.list.tasks;
                })
            );
    }

    createTask(ownerId: string, listId: string, input: TaskItemInput): Observable<TaskItem> {
        return this._http
            .post('/zv/GraphQL', {
                query: `mutation createTask($u:String!,$l:String!,$t:TaskInput!) {
                    createTask(ownerId:$u,listId:$l,task:$t) { id title description due tags createdAt } }`,
                variables: {u: ownerId, l: listId, t: input}
            })
            .pipe(
                map<any, TaskItem>(resp => {
                    ensureSuccessResponse(resp);
                    return <TaskItem>resp.data.createTask;
                })
            );
    }

    getTaskItem(userId: string, listId: string, taskId: string) {
        return from(testTaskItems.filter(task => task.id === taskId && task.list === listId))
            .pipe(
                map(task => <TaskItem>Object.assign({}, task))
            );
    }

    get(id: string) {
        return from(testTaskItems
            .filter(task => task.id === id)
            .map(task => <TaskItem>Object.assign({}, task))
        );
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
