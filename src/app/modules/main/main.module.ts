import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegistrationService } from './services/registration.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        NotFoundComponent,
        DashboardComponent,
        UserProfileComponent,
    ],
    providers: [
        AuthService,
        RegistrationService,
    ],
    exports: [
        NavbarComponent
    ]
})
export class MainModule {
}
