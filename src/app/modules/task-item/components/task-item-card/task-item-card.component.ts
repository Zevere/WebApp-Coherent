import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItem } from '../../../shared/models/task-item';

@Component({
    selector: 'app-task-item-card',
    templateUrl: './task-item-card.component.html'
})
export class TaskItemCardComponent {
    @Input() ownerId: string;
    @Input() listId: string;
    @Input() task: TaskItem;
    @Input() isOwner: boolean;
    @Output() delete = new EventEmitter();

    get tooltip() {
        let value = '';
        if (this.task) {
            value = `Task "${this.task.id}"\n was created on ${this.task.createdAt}.`;
        }
        return value;
    }

    deleteTask() {
        this.delete.emit();
    }
}
