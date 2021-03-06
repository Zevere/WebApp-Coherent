import { Routes } from '@angular/router';

import { LoginComponent } from './modules/main/components/login/login.component';
import { RegisterComponent } from './modules/main/components/register/register.component';
import { HomeComponent } from './modules/main/components/home/home.component';
import { NotFoundComponent } from './modules/main/components/not-found/not-found.component';
import { AllTaskListsComponent } from './modules/task-list/components/all-task-lists/all-task-lists.component';
import { TaskListComponent } from './modules/task-list/components/task-list/task-list.component';
import { UserProfileComponent } from './modules/main/components/user-profile/user-profile.component';
import { AllTaskItemsComponent } from './modules/task-item/components/all-task-items/all-task-items.component';
import { NewTaskListComponent } from './modules/task-list/components/new-task-list/new-task-list.component';
import { NewTaskItemComponent } from './modules/task-item/components/new-task-item/new-task-item.component';

/**
 * Creates application routes
 */
export function getRoutes(): Routes {
    return [
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'home', component: HomeComponent},
        {path: 'profile', component: UserProfileComponent},
        {
            path: 'users/:userId', children: [
                {path: '', component: UserProfileComponent, pathMatch: 'full'},
                {
                    path: 'lists', children: [
                        {path: '', component: AllTaskListsComponent, pathMatch: 'full'},
                        {path: 'new', component: NewTaskListComponent},
                        {
                            path: ':listId', children: [
                                {path: '', component: TaskListComponent, pathMatch: 'full'},
                                {
                                    path: 'tasks', children: [
                                        {path: '', component: AllTaskItemsComponent, pathMatch: 'full'},
                                        {path: 'new', component: NewTaskItemComponent},
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: '**', component: NotFoundComponent}
    ];
}
