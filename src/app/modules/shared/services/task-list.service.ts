import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskList } from '../models/task-list';
import { testTaskItems, testTaskLists } from '../test-data';
import { TaskListTags } from '../models/task-list-tags';
import { TaskItem } from '../models/task-item';
import { TaskItemTags } from '../models/task-item-tags';

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
