import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    user?: User;
    profileLink: string[];

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    ngOnInit() {
        this._authService
            .watchLogin()
            .subscribe(
                user => {
                    this.profileLink = [`/students/view/${user.id}`];
                    this.user = user;
                }
            );

        this._authService
            .watchLogout()
            .subscribe(
                () => {
                    this.user = null;
                    this.profileLink = null;
                }
            );
    }

    /**
     * Makes logout request
     */
    logout() {
        this._authService.logout();
        this._router.navigate(['']);
    }
}
