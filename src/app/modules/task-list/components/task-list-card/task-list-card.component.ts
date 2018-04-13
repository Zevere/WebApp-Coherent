import { Component, Input } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';

@Component({
    selector: 'app-task-list-card',
    templateUrl: './task-list-card.component.html'
})
export class TaskListCardComponent {
    @Input() taskList: TaskList;
}
