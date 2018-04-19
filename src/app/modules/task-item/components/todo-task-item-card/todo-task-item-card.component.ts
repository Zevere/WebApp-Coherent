import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItemService } from '../../../shared/services/task-item.service';
import { TaskItem } from '../../../shared/models/task-item';
import { NgForm } from '@angular/forms';
import { TaskItemTags } from '../../../shared/models/task-item-tags';

@Component({
    selector: 'app-todo-task-item-card',
    templateUrl: './todo-task-item-card.component.html'
})
export class TodoTaskItemCardComponent implements OnInit {
    @Input() task: TaskItem;
    @Output() taskUpdated = new EventEmitter<TaskItem>();
    isDone: boolean;

    constructor(
        private _taskItemService: TaskItemService
    ) {
    }

    ngOnInit() {
        this.isDone = (this.task.tags || []).some(tg => tg === '_stage:done');
    }

    updateStage(form: NgForm) {
        const tempTags = new TaskItemTags(this.task.tags);
        tempTags.stage = this.isDone ? 'done' : 'todo';
        this.task.tags = tempTags.toTagsArray();

        this._taskItemService
            .update(this.task)
            .subscribe(
                task => {
                    this.task = task;
                    this.taskUpdated.emit(this.task);
                },
                e => {
                    console.warn(e);
                }
            );
    }
}
