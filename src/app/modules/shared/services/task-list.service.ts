import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TaskList } from '../models/task-list';
import { ensureSuccessResponse } from '../helpers/ensure-success-response';
import { TaskListInput } from '../../task-list/models/task-list-input';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TaskListService {
    constructor(
        private _http: HttpClient
    ) {
    }

    /**
     * Gets a single task list
     */
    getTaskList(userId: string, listId: string): Observable<TaskList> {
        return this._http
            .post('/zv/GraphQL', {
                query: `query GetSingleTaskList($u:String!,$l:String!) { user(userId: $u) {
                    list(listId: $l) { id title description owner collaborators tags createdAt updatedAt }
                } }`,
                variables: {u: userId, l: listId}
            })
            .pipe(
                map<any, TaskList>(resp => {
                    ensureSuccessResponse(resp);
                    return <TaskList>resp.data.user.list;
                })
            );
    }

    /**
     * Gets all the task lists for a user
     */
    getAllTaskLists(userId: string): Observable<TaskList[]> {
        return this._http
            .post('/zv/GraphQL', {
                query: `query getAllTaskLists($u:String!) { user(userId: $u) {
                    lists { id title description owner collaborators tags createdAt updatedAt }
                } }`,
                variables: {u: userId}
            })
            .pipe(
                map<any, TaskList[]>(resp => {
                    ensureSuccessResponse(resp);
                    return <TaskList[]>resp.data.user.lists;
                })
            );
    }

    /**
     * Creates a new task list
     */
    createList(ownerId: string, input: TaskListInput): Observable<TaskList> {
        return this._http
            .post('/zv/GraphQL', {
                query: `mutation createList($u:String!,$i:ListInput!) { createList(owner:$u,list:$i) { id createdAt } }`,
                variables: {u: ownerId, i: input}
            })
            .pipe(
                map<any, TaskList>(resp => {
                    ensureSuccessResponse(resp);
                    return <TaskList>resp.data.createList;
                })
            );
    }

    /**
     * Deletes a task list
     */
    deleteList(userId: string, listId: string): Observable<boolean> {
        return this._http
            .post('/zv/GraphQL', {
                query: `mutation deleteList($u:String!,$l:String!) { deleteList(owner: $u, list: $l) }`,
                variables: {u: userId, l: listId}
            })
            .pipe(
                map<any, boolean>(resp => {
                    ensureSuccessResponse(resp);
                    return <boolean>resp.data.deleteList;
                })
            );
    }
}
