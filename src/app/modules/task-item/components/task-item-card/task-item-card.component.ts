import { Component, Input } from '@angular/core';
import { TaskItemService } from '../../../shared/services/task-item.service';
import { TaskItem } from '../../../shared/models/task-item';

@Component({
    selector: 'app-task-item-card',
    templateUrl: './task-item-card.component.html'
})
export class TaskItemCardComponent {
    @Input() task: TaskItem;

    public get tooltip() {
        let value = '';
        if (this.task) {
            value = `Task "${this.task.id}"\n was created on ${this.task.createdAt}.`;
        }
        return value;
    }

    constructor(
        private _taskItemService: TaskItemService
    ) {
    }
}
