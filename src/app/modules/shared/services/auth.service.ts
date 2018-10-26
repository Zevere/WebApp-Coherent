import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { testUsers } from '../test-data';
import { LoginInput } from '../../main/models/login-input';
import { ensureSuccessResponse } from '../helpers/ensure-success-response';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    get user(): User {
        return this._currentUser;
    }

    get redirectUri(): string {
        return this._redirectUri;
    }

    set redirectUri(uri: string) {
        this._redirectUri = uri;
    }

    private _currentUser: User;

    private _authEventEmitter = new EventEmitter();

    private _redirectUri?: string;

    constructor(
        private _http: HttpClient
    ) {
        this._currentUser = testUsers[1]; // ToDo remove
    }

    watchLogin() {
        return fromEvent<User>(this._authEventEmitter, 'login');
    }

    watchLogout() {
        return fromEvent(this._authEventEmitter, 'logout');
    }

    login(login: LoginInput) {
        return this._http
            .post('/zv/GraphQL', {
                query: `mutation ($l: LoginInput!) { login(login: $l) { id firstName lastName token } }`,
                variables: {l: login}
            })
            .pipe(
                map<any, void>(resp => {
                    ensureSuccessResponse(resp);
                    this._currentUser = <User> resp.data.login;
                    this._authEventEmitter.emit('login', this.user);
                })
            );
    }

    logout() {
        this._authEventEmitter.emit('logout');
        this._currentUser = null;
    }

    redirectToUri(document: Document, router: Router) {
        if (this._redirectUri) {
            let uri = this._redirectUri;
            if (/^(?:http|https|slack|tg):\/\/.+/gi.test(uri)) {
                // absolute URI means redirect to the outside of this app
                const username = 'zv-user=' + encodeURIComponent(this.user.id);

                uri += uri.includes('?') ? '&' : '?';
                uri += username;

                document.location.href = uri;
            } else {
                // URI is for this web app
                router.navigateByUrl(uri);
            }
        } else {
            // navigate to home page by default
            router.navigate(['/']);
        }
    }
}
