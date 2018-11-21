import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';

@Component({
    selector: 'app-task-list-card',
    templateUrl: './task-list-card.component.html'
})
export class TaskListCardComponent implements OnInit {
    @Input() taskList: TaskList;
    icon: string;
    tags: string[];

    ngOnInit(): void {
        this.parseTags();
    }

    private parseTags() {
        // ToDo iterate array once

        if (this.taskList.tags && this.taskList.tags.length) {
            this.tags = this.taskList
                .tags
                .map((t: string) => t.substr(t.indexOf(':') + 1));

            this.icon = this.taskList
                .tags
                .filter((t: string) => t.startsWith('_icon:'))
                .map((t: string) => t.substr(6))
                [0];
        }
    }
}
