import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskItemTags } from '../../../shared/models/task-item-tags';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskItemService } from '../../../shared/services/task-item.service';
import { TaskList } from '../../../shared/models/task-list';

@Component({
    selector: 'app-edit-project-task-item',
    templateUrl: './edit-project-task-item.component.html'
})
export class EditProjectTaskItemComponent implements OnInit {
    @Input() task: TaskItem;
    @Input() taskList: TaskList;
    @Input() tags: TaskItemTags;
    taskItemForm: FormGroup;
    isWaitingForResponse: boolean;
    error: string;

    stages = TaskItemTags.stages;
    priorities = TaskItemTags.priorities;

    constructor(
        private _taskItemService: TaskItemService,
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.buildForm(this.task, this.tags);
    }

    submit() {
        this._taskItemService
            .update(this.getFormModel())
            .subscribe(
                task => {
                    this.task = task;
                    this.tags = new TaskItemTags(task.tags);
                    this.buildForm(this.task, this.tags);
                },
                e => {
                    console.warn(e);
                }
            );
    }

    private buildForm(task: TaskItem, tags: TaskItemTags) {
        this.taskItemForm = this._formBuilder.group({
            title: [task.title, Validators.required],
            description: [task.description],
            stage: [tags.stage, Validators.required],
            priority: [tags.priority],
            kind: [tags.kind],
            progress: [tags.progress || 0],
        });
    }

    private getFormModel(): TaskItem {
        const newModel: any = Object.assign({}, this.taskItemForm.value);
        newModel.id = this.task.id;

        newModel.tags = [`_stage:${newModel.stage}`];
        delete newModel.stage;

        return newModel;
    }
}
