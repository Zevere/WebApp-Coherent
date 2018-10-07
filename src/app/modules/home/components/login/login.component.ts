import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../../shared/helpers/get-error-message';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginInput } from '../../models/login-input';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loginForm: FormGroup;
    isSending: boolean;
    error?: string;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        formBuilder: FormBuilder
    ) {
        this.loginForm = formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(2)]],
            passphrase: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    login() {
        this.isSending = true;
        this._authService
            .login(this.getModel())
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

    private getModel(): LoginInput {
        const newModel: any = Object.assign({}, this.loginForm.value);
        return newModel;
    }
}
