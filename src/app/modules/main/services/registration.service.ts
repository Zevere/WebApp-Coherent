import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInput } from '../models/user-input';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';

@Injectable()
export class RegistrationService {

    constructor(
        private _http: HttpClient
    ) {
    }

    registerUser(input: UserInput) {
        return this._http
            .post('/zv/GraphQL', {
                query: `mutation ($u: UserInput!) { createUser(user: $u) { token } }`,
                variables: {u: input}
            })
            .pipe(
                map<any, User>(resp => {
                    if (resp.errors && resp.errors.length) {
                        throw resp.errors[0].message;
                    }
                    return resp.data.createUser;
                })
            );
    }
}
