import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { areEqual } from '../../../shared/form-validators/are-equal.validator';
import { RegistrationService } from '../../services/registration.service';
import { UserInput } from '../../models/user-input';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../../shared/helpers/get-error-message';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    registrationForm: FormGroup;
    isSending: boolean;
    error?: string;

    constructor(
        private _registrationService: RegistrationService,
        private _router: Router,
        formBuilder: FormBuilder
    ) {
        this.registrationForm = formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.minLength(2)]],
            name: ['', Validators.required],
            passphrase: formBuilder.group({
                pass: ['', [Validators.required, Validators.minLength(6)]],
                passConfirm: ['', Validators.required]
            }, {validator: areEqual}),
            // members: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    registerUser() {
        this.isSending = true;
        this._registrationService
            .registerUser(this.getModel())
            .subscribe(
                () => {
                    this._router.navigate(['/']);
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    private getModel(): UserInput {
        const newModel: any = Object.assign({}, this.registrationForm.value);
        newModel.passphrase = newModel.passphrase.pass;
        return newModel;
    }
}
