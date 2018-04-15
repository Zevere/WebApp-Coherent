import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskListTags } from '../../../shared/models/task-list-tags';
import { TaskItemTags } from '../../../shared/models/task-item-tags';

@Component({
    selector: 'app-project-tasks',
    templateUrl: './project-tasks.component.html'
})
export class ProjectTasksComponent implements OnInit {
    @Input() project: TaskList;
    @Input() projectTags: TaskListTags;
    @Input() tasks: TaskItem[];

    backlogTasks: TaskItem[];
    todoTasks: TaskItem[];
    inProgressTasks: TaskItem[];
    doneTasks: TaskItem[];

    constructor() {
    }

    ngOnInit() {
        this.assignTaskKinds();
    }

    private assignTaskKinds() {
        const taggedTasks = this.tasks
            .map(t => <any>{task: t, tags: new TaskItemTags(t.tags)});

        function getTasksInStage(stage: string) {
            return taggedTasks
                .filter(x => x.tags.stage === stage)
                .map(x => x.task);
        }

        this.backlogTasks = getTasksInStage('backlog');
        this.todoTasks = getTasksInStage('todo');
        this.inProgressTasks = getTasksInStage('in_progress');
        this.doneTasks = getTasksInStage('done');
    }
}
