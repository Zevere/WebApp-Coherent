import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        NotFoundComponent,
        DashboardComponent,
    ],
    providers: [
        AuthService
    ],
    exports: [
        NavbarComponent
    ]
})
export class HomeModule {
}
