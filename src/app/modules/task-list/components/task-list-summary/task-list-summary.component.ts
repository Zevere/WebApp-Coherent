import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';
import { Observable } from 'rxjs';


import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';
import { NgForm } from '@angular/forms';
import { TaskListService } from '../../../shared/services/task-list.service';
import { concatMap, map } from 'rxjs/operators';

@Component({
    selector: 'app-task-list-summary',
    templateUrl: './task-list-summary.component.html'
})
export class TaskListSummaryComponent implements OnInit {
    @Input() taskList: TaskList;
    @Input() allowEdit: boolean;
    tags: { name: string; value: string; }[];

    constructor(
        private _userService: UserService,
        private _taskListService: TaskListService
    ) {
    }

    ngOnInit() {
        this.parseTags();
    }

    findMatchingUsers = (text: Observable<string>) => {
        return text
            .pipe(
                concatMap(term =>
                    this._userService.getAll()
                        .pipe(
                            map<User[], string[]>(users =>
                                users.filter(u => new RegExp(`^.*${term}.*$`, 'i').test(u.id))
                                    .map(u => u.id)
                            )
                        )
                )
            );
    };

    addCollaborator(form: NgForm) {
        this._taskListService
            .addCollaborator(this.taskList.id, form.value.collaborator)
            .subscribe(
                list => {
                    this.taskList = list;
                    form.resetForm();
                },
                e => {
                    console.warn(e);
                }
            );
    }

    private parseTags() {
        // ToDo iterate array once

        this.tags = this.taskList
            .tags
            .map((t: string) => {
                return {
                    name: t.substr(0, t.indexOf(':')),
                    value: t.substr(t.indexOf(':') + 1)
                };
            });
    }
}
