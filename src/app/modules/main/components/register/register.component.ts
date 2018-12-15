import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { areEqual } from '../../../shared/form-validators/are-equal.validator';
import { RegistrationService } from '../../services/registration.service';
import { UserInput } from '../../models/user-input';
import { ActivatedRoute, Router } from '@angular/router';
import { getErrorMessage } from '../../../shared/helpers/get-error-message';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    registrationForm: FormGroup;
    isSending: boolean;
    error?: string;
    _redirectUri?: string;

    constructor(
        private _registrationService: RegistrationService,
        private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
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
        });
    }

    ngOnInit() {
        this._route.queryParamMap
            .subscribe(map => {
                if (map.has('redirect_uri')) {
                    this._redirectUri = decodeURIComponent(map.get('redirect_uri'));
                }
            });
    }

    /**
     * Makes user registration request
     */
    registerUser() {
        this.isSending = true;

        const model = this.getModel();
        this._registrationService
            .registerUser(model)
            .subscribe(
                () => {
                    this.logUserIn(model.name, model.passphrase);
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

    /**
     * Makes login request after successful registration
     */
    private logUserIn(user: string, pass: string) {
        this._authService
            .login({username: user, passphrase: pass})
            .subscribe(
                () => {
                    this.redirectToUri();
                    this.isSending = false;
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    /**
     * Redirects the user after registration to home view or the path of "redirect_uri" query parameter
     */
    private redirectToUri() {
        let uri = this._redirectUri;
        if (uri) {
            if (/^(?:http|https|slack):\/\/.+/gi.test(uri)) {
                // absolute URI means redirect to the outside of this app
                const username = 'zv-user=' + encodeURIComponent(this._authService.user.id);

                uri += uri.indexOf('?') > 0 ? '&' : '?';
                uri += username;

                this._document.location.href = uri;
            } else {
                // URI is for this web app
                this._router.navigateByUrl(uri);
            }
        } else {
            // navigate to home page by default
            this._router.navigate(['/']);
        }
    }
}
