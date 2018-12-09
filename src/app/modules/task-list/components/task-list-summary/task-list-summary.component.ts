import { Component, Input, OnInit } from '@angular/core';
import { TaskListService } from '../../../shared/services/task-list.service';
import { TaskList } from '../../../shared/models/task-list';

@Component({
    selector: 'app-task-list-summary',
    templateUrl: './task-list-summary.component.html'
})
export class TaskListSummaryComponent implements OnInit {
    @Input() taskList: TaskList;
    @Input() allowEdit: boolean;
    tags: { name: string; value: string; }[];

    constructor(
        private _taskListService: TaskListService
    ) {
    }

    ngOnInit() {
        this.parseTags();
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
