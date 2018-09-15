import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

import { User } from '../models/user';
import { testUsers } from '../test-data';

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
        this._currentUser = testUsers[1];
    }

    watchLogin() {
        return fromEvent<User>(this._authEventEmitter, 'login');
    }

    watchLogout() {
        return fromEvent(this._authEventEmitter, 'logout');
    }

    registerUser(user: User) {
        return this._http
            .post<User>('/api/register', user);
    }

    login(login: { username: string, password: string }) {
        return this._http
            .post<User>('/api/login', login)
            .do(user => {
                this._currentUser = user;
                this._authEventEmitter.emit('login', user);
            });
    }

    logout() {
        return this._http
            .post('/api/logout', null)
            .do(() => {
                this._authEventEmitter.emit('logout');
                this._currentUser = null;
            });
    }
}
