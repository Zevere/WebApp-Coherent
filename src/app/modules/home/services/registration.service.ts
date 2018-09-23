import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInput } from '../models/user-input';
import { User } from '../../shared/models/user';

@Injectable()
export class RegistrationService {

    constructor(
        private _http: HttpClient
    ) {
    }

    registerUser(input: UserInput) {
        const mutation = `mutation{createUser(user:$u){token}}`;

        return this._http
            .post<User>('/zv/GraphQL', {u: input});
    }
}
