import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../../shared/models/task-item';

@Component({
    selector: 'app-task-item-card',
    templateUrl: './task-item-card.component.html'
})
export class TaskItemCardComponent implements OnInit {

    @Input() task: TaskItem;

    constructor() {
    }

    ngOnInit() {
    }

}
