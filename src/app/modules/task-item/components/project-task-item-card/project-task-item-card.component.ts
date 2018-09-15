import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskItemTags } from '../../../shared/models/task-item-tags';

@Component({
    selector: 'app-project-task-item-card',
    templateUrl: './project-task-item-card.component.html'
})
export class ProjectTaskItemCardComponent implements OnInit {
    @Input() task: TaskItem;
    tags: TaskItemTags;

    constructor() {
    }

    ngOnInit() {
        this.tags = new TaskItemTags(this.task.tags);
    }
}
