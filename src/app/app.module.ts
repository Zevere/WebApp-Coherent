import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './modules/home/home.module';
import { TaskListModule } from './modules/task-list/task-list.module';

import { AppComponent } from './app.component';
import { getRoutes } from './routes';
import { ProfileModule } from './modules/profile/profile.module';
import { TaskItemModule } from './modules/task-item/task-item.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(getRoutes()),
        HttpClientModule,
        HomeModule,
        ProfileModule,
        TaskListModule,
        TaskItemModule,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
