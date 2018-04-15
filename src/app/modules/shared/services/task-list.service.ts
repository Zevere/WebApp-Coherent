import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskList } from '../models/task-list';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { from } from 'rxjs/observable/from';
import { testTaskLists } from '../test-data';
import { TaskListTags } from '../models/task-list-tags';

@Injectable()
export class TaskListService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getTaskList(userId: string, listId: string) {
        return from(testTaskLists.filter(list => list.id === listId && list.owner === userId))
            .map(list => <TaskList>Object.assign({}, list));
    }

    getAllTaskLists(userId: string) {
        return from([testTaskLists]);

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
}

function throwIfHasErrors(response: any) {
    if (response.errors && response.errors.length) {
        throw new Error(response.errors[0].message);
    }
}
