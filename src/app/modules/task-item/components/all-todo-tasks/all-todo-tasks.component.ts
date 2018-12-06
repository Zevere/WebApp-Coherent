import { Component, Input } from '@angular/core';
import { TaskItem } from '../../../shared/models/task-item';

@Component({
    selector: 'app-all-todo-tasks',
    templateUrl: './all-todo-tasks.component.html'
})
export class AllTodoTasksComponent {
    @Input() taskItems: TaskItem[];
}
