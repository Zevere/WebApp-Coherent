import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListCardComponent } from './components/task-list-card/task-list-card.component';
import { TaskListsComponent } from './components/task-lists/task-lists.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TaskListCardComponent, TaskListsComponent]
})
export class TaskListModule { }
