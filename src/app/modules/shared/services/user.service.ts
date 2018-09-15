import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { testUsers } from '../test-data';

@Injectable()
export class UserService {
    constructor(
        private _http: HttpClient
    ) {
    }

    get(id: string) {
    }

    getAll() {
        return from([testUsers]);
    }
}
