import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TaskItem } from '../models/task-item';
import { Observable } from 'rxjs/internal/Observable';
import { ensureSuccessResponse } from '../helpers/ensure-success-response';
import { TaskItemInput } from '../../task-item/models/task-item-input';

@Injectable()
export class TaskItemService {
    constructor(
        private _http: HttpClient
    ) {
    }

    /**
     * Gets all the tasks in a list
     */
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

    /**
     * Creates a new task
     */
    createTask(ownerId: string, listId: string, input: TaskItemInput): Observable<TaskItem> {
        return this._http
            .post('/zv/GraphQL', {
                query: `mutation CreateTask($u:String!,$l:String!,$t:TaskInput!) {
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

    /**
     * Deletes a single task
     */
    deleteTask(ownerId: string, listId: string, taskId: string): Observable<void> {
        return this._http
            .post('/zv/GraphQL', {
                query: `mutation DeleteTask($u:String!,$l:String!,$t:String!) { deleteTask(ownerId:$u,listId:$l,taskId:$t) }`,
                variables: {u: ownerId, l: listId, t: taskId}
            })
            .pipe(
                map<any, void>(resp => {
                    ensureSuccessResponse(resp);
                })
            );
    }
}
