import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { testUsers } from '../test-data';
import { LoginInput } from '../../home/models/login-input';
import { ensureSuccessResponse } from '../helpers/ensure-success-response';

@Injectable()
export class AuthService {

    get user(): User {
        return this._currentUser;
    }

    private _currentUser: User;

    private _authEventEmitter = new EventEmitter();

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
}
