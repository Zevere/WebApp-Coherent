import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements AfterViewInit {

    @ViewChild('tgWidget') tgWidgetEl: ElementRef;

    profileForm: FormGroup;

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

    /**
     * Appends Telegram Login Widget script to the page
     */
    ngAfterViewInit() {
        const botName = environment.tgBot;
        const redirectUri = environment.tgRedirectUrl + `?zv-user=${this._authService.user.id}`;

        const script = document.createElement('script');
        script.setAttribute('async', 'async');
        script.type = 'text/javascript';
        script.src = 'https://telegram.org/js/telegram-widget.js?4';
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', redirectUri);
        script.setAttribute('data-request-access', 'write');
        this.tgWidgetEl.nativeElement.appendChild(script);
    }
}
