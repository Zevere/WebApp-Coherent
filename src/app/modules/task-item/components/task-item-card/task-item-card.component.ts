import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskItemTags } from '../../../shared/models/task-item-tags';

@Component({
    selector: 'app-task-item-card',
    templateUrl: './task-item-card.component.html'
})
export class TaskItemCardComponent implements OnInit {
    @Input() task: TaskItem;
    tags: TaskItemTags;

    ngOnInit() {
        this.tags = new TaskItemTags(this.task.tags);
    }

}
