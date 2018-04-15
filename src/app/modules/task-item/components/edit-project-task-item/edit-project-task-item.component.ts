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
    taskItemFrom: FormGroup;
    isWaitingForResponse: boolean;
    error: string;

    constructor(
        private _taskItemService: TaskItemService,
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    submit() {

    }

    private buildForm() {
        this.taskItemFrom = this._formBuilder.group({
            title: [this.task.title, Validators.required],
            description: [this.task.description],
        });
    }
}
