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

    getTaskList(userId: string, listId: string) {
        return from(testTaskLists.filter(list => list.id === listId && list.owner === userId))
            .pipe(
                map(list => <TaskList>Object.assign({}, list))
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

    getAllTaskLists(userId: string) {
        return this._http
            .post('/zv/GraphQL', {
                query: `query getAllTaskLists($u:String!) { user(userId: $u) { lists { id title createdAt } } }`,
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
}
