import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';
import { TaskListService } from '../../../shared/services/task-list.service';
import { TaskList } from '../../../shared/models/task-list';
import { User } from '../../../shared/models/user';

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

        if (this.taskList.tags && this.taskList.tags.length) {
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
}
