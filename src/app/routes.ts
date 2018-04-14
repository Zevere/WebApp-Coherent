import { Routes } from '@angular/router';
import { LoginComponent } from './modules/home/components/login/login.component';
import { DashboardComponent } from './modules/home/components/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { NotFoundComponent } from './modules/home/components/not-found/not-found.component';
import { AllTaskListsComponent } from './modules/task-list/components/all-task-lists/all-task-lists.component';
import { TaskListComponent } from './modules/task-list/components/task-list/task-list.component';
import { UserProfileComponent } from './modules/profile/components/user-profile/user-profile.component';

export function getRoutes(): Routes {
    return [
        {path: 'login', component: LoginComponent},
        {path: 'home', component: HomeComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'my-lists', component: AllTaskListsComponent},
        {path: 'users/:userId', component: UserProfileComponent},
        {
            path: 'users/:userId/lists', children: [
                {path: ':listId', component: TaskListComponent},
                {path: '', component: AllTaskListsComponent},
            ]
        },
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: '**', component: NotFoundComponent}
    ];
}
