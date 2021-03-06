import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getErrorMessage } from '../../../shared/helpers/get-error-message';
import { TaskListService } from '../../../shared/services/task-list.service';

@Component({
    selector: 'app-new-task-list',
    templateUrl: './new-task-list.component.html'
})
export class NewTaskListComponent {
    newListForm: FormGroup;
    isSending: boolean;
    error?: string;

    constructor(
        private _taskListService: TaskListService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private _router: Router,
        formBuilder: FormBuilder
    ) {
        this.newListForm = formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', [Validators.minLength(5)]],
        });
    }

    /**
     * Makes a task list creation request
     */
    createNewList() {
        this.isSending = true;

        const model = Object.assign({}, this.newListForm.value);
        model.id = model.title.replace(/\W/g, '-');

        this._taskListService
            .createList(this._authService.user.id, model)
            .subscribe(
                () => {
                    this.isSending = false;
                    this.newListForm.reset();
                    this._router.navigate(['..'], {relativeTo: this._route});
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }
}
