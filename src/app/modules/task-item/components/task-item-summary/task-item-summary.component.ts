import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../../shared/models/task-item';

@Component({
    selector: 'app-task-item-summary',
    templateUrl: './task-item-summary.component.html'
})
export class TaskItemSummaryComponent implements OnInit {
    @Input() taskItem: TaskItem;
    @Input() allowEdit: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
