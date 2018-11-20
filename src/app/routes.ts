import { Routes } from '@angular/router';

import { LoginComponent } from './modules/main/components/login/login.component';
import { RegisterComponent } from './modules/main/components/register/register.component';
import { DashboardComponent } from './modules/main/components/dashboard/dashboard.component';
import { HomeComponent } from './modules/main/components/home/home.component';
import { NotFoundComponent } from './modules/main/components/not-found/not-found.component';
import { MyTaskListsComponent } from './modules/task-list/components/my-task-lists/my-task-lists.component';
import { TaskListComponent } from './modules/task-list/components/task-list/task-list.component';
import { UserProfileComponent } from './modules/profile/components/user-profile/user-profile.component';
import { AllTaskItemsComponent } from './modules/task-item/components/all-task-items/all-task-items.component';
import { TaskItemComponent } from './modules/task-item/components/task-item/task-item.component';
import { NewTaskListComponent } from './modules/task-list/components/new-task-list/new-task-list.component';

export function getRoutes(): Routes {
    return [
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'home', component: HomeComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'profile', component: UserProfileComponent},
        {
            path: 'my-lists', children: [
                {path: '', component: MyTaskListsComponent, pathMatch: 'full'},
                {path: 'new', component: NewTaskListComponent},
            ]
        },
        {
            path: 'users/:userId', children: [
                {path: '', component: UserProfileComponent, pathMatch: 'full'},
                {
                    path: 'lists', children: [
                        {path: '', component: MyTaskListsComponent, pathMatch: 'full'},
                        {
                            path: ':listId', children: [
                                {path: '', component: TaskListComponent, pathMatch: 'full'},
                                {
                                    path: 'tasks', children: [
                                        {path: '', component: AllTaskItemsComponent, pathMatch: 'full'},
                                        {path: ':taskId', component: TaskItemComponent},
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
