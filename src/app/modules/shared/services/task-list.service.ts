import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskList } from '../models/task-list';
import { testTaskLists } from '../test-data';
import { ensureSuccessResponse } from '../helpers/ensure-success-response';
import { TaskListInput } from '../../task-list/models/task-list-input';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TaskListService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getTaskList(userId: string, listId: string): Observable<TaskList> {
        return this.getAllTaskLists(userId) // ToDo query a single list by id
            .pipe(
                map(allLists => allLists.find(l => l.id === listId))
            );
    }

    addCollaborator(listId: string, collaboratorId: string) {
        const list = testTaskLists.filter(l => l.id === listId)[0];

        if (!list.collaborators) {
            list.collaborators = [];
        }
        list.collaborators.push(collaboratorId);

        return from([list]);
    }

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
