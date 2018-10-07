import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

    profileForm: FormGroup;
    isSending: boolean;
    error?: string;

    constructor(
        private _authService: AuthService,
        formBuilder: FormBuilder
    ) {
        const user = this._authService.user;

        this.profileForm = formBuilder.group({
            firstName: [{value: user.firstName, disabled: true}, [Validators.required, Validators.minLength(2)]],
            lastName: [{value: user.lastName, disabled: true}, [Validators.minLength(2)]],
            name: [{value: user.id, disabled: true}, Validators.required],
            passphrase: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
        });
    }
}
