import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskItemService } from '../../../shared/services/task-item.service';
import { getErrorMessage } from '../../../shared/helpers/get-error-message';
import { TaskItemInput } from '../../models/task-item-input';

@Component({
    selector: 'app-new-task-item',
    templateUrl: './new-task-item.component.html'
})
export class NewTaskItemComponent implements OnInit {
    newTaskForm: FormGroup;
    _listId: string;
    isSending: boolean;
    error?: string;

    constructor(
        private _taskItemService: TaskItemService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private _router: Router,
        formBuilder: FormBuilder
    ) {
        this.newTaskForm = formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', [Validators.minLength(5)]],
        });
    }

    ngOnInit() {
        this._route
            .paramMap
            .subscribe(p => {
                    this._listId = p.get('listId');
                },
                e => {
                    console.warn(e);
                }
            );
    }

    createNewTask() {
        this.isSending = true;

        this._taskItemService
            .createTask(this._authService.user.id, this._listId, this.getModel())
            .subscribe(
                () => {
                    this.isSending = false;
                    this.newTaskForm.reset();
                    this._router.navigate(['..'], {relativeTo: this._route});
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    private getModel(): TaskItemInput {
        const model = <TaskItemInput>Object.assign({}, this.newTaskForm.value);

        if (!(model.description && model.description.length)) {
            delete model.description;
        }

        if (!model.due) {
            delete model.due;
        }

        return model;
    }
}
