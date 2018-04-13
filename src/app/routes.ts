import { Routes } from '@angular/router';
import { LoginComponent } from './modules/home/components/login/login.component';
import { DashboardComponent } from './modules/home/components/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { NotFoundComponent } from './modules/home/components/not-found/not-found.component';
import { TaskListsComponent } from './modules/task-list/components/task-lists/task-lists.component';

export function getRoutes(): Routes {
    return [
        {path: 'login', component: LoginComponent},
        {path: 'home', component: HomeComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'my-lists', component: TaskListsComponent},
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: '**', component: NotFoundComponent}
    ];
}
