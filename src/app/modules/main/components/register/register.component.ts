import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { areEqual } from '../../../shared/form-validators/are-equal.validator';
import { RegistrationService } from '../../services/registration.service';
import { UserInput } from '../../models/user-input';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../../shared/helpers/get-error-message';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    registrationForm: FormGroup;
    isSending: boolean;
    error?: string;

    constructor(
        private _authService: AuthService,
        private _registrationService: RegistrationService,
        private _router: Router,
        @Inject(DOCUMENT) private _document: any,
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
                    this._authService.redirectToUri(this._document, this._router);
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
