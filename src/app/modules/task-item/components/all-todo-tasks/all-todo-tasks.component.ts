import { Component, Input, OnInit } from '@angular/core';
import { TaskListTags } from '../../../shared/models/task-list-tags';
import { TaskList } from '../../../shared/models/task-list';
import { TaskItem } from '../../../shared/models/task-item';
import { toPrettyFloat } from '../../../shared/helpers/number-helpers';
import { TaskItemTags } from '../../../shared/models/task-item-tags';
import { TaskItemService } from '../../../shared/services/task-item.service';

@Component({
    selector: 'app-all-todo-tasks',
    templateUrl: './all-todo-tasks.component.html'
})
export class AllTodoTasksComponent implements OnInit {
    @Input() taskItems: TaskItem[];
    @Input() taskList: TaskList;
    @Input() taskListTags: TaskListTags;

    progress: string;

    constructor(
        private taskItemService: TaskItemService
    ) {
    }

    ngOnInit() {
        this.calculateProgress();
    }

    updateTaskItem(task: TaskItem) {
        const i = this.taskItems.findIndex(t => t.id === task.id);
        this.taskItems[i] = task;
        this.calculateProgress();
    }

    calculateProgress() {
        const taggedTasks = this.taskItems
            .map(t => <any>{task: t, tags: new TaskItemTags(t.tags)});
        const doneTasksCount = taggedTasks.filter(x => x.tags.stage === 'done').length;
        this.progress = toPrettyFloat(doneTasksCount / this.taskItems.length * 100);
    }
}
