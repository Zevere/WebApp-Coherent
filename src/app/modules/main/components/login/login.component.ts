import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getErrorMessage } from '../../../shared/helpers/get-error-message';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    isSending: boolean;
    error?: string;
    _redirectUri?: string;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
        @Inject(DOCUMENT) private _document: any,
        formBuilder: FormBuilder
    ) {
        this.loginForm = formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(2)]],
            passphrase: ['', [Validators.required, Validators.minLength(6)]],
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
     * Makes login request
     */
    login() {
        this.isSending = true;
        const newModel: any = Object.assign({}, this.loginForm.value);

        this._authService
            .login(newModel)
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
     * Redirects the user after login to home view or the path of "redirect_uri" query parameter
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
