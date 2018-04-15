import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { from } from 'rxjs/observable/from';
import { testTaskItems } from '../test-data';

@Injectable()
export class TaskItemService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getTaskItem(userId: string, listId: string, taskId: string) {
        return from([testTaskItems[0]]);
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
}

function throwIfHasErrors(response: any) {
    if (response.errors && response.errors.length) {
        throw new Error(response.errors[0].message);
    }
}
