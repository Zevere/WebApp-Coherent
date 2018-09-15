import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../../../shared/models/task-list';
import { TaskItem } from '../../../shared/models/task-item';
import { TaskListTags } from '../../../shared/models/task-list-tags';
import { TaskItemTags } from '../../../shared/models/task-item-tags';
import { toPrettyFloat } from '../../../shared/helpers/number-helpers';

@Component({
    selector: 'app-all-project-tasks',
    templateUrl: './all-project-tasks.component.html'
})
export class AllProjectTasksComponent implements OnInit {
    @Input() project: TaskList;
    @Input() projectTags: TaskListTags;
    @Input() tasks: TaskItem[];

    backlogTasks: TaskItem[];
    todoTasks: TaskItem[];
    inProgressTasks: TaskItem[];
    doneTasks: TaskItem[];
    progress: {
        todo: string,
        inProgress: string,
        done: string,
    };

    ngOnInit() {
        this.assignTaskKinds();
        this.calculateProgress();
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

    private calculateProgress() {
        const totalTasks = this.todoTasks.length + this.inProgressTasks.length + this.doneTasks.length;

        this.progress = {
            todo: toPrettyFloat(this.todoTasks.length / totalTasks * 100),
            inProgress: toPrettyFloat(this.inProgressTasks.length / totalTasks * 100),
            done: toPrettyFloat(this.doneTasks.length / totalTasks * 100),
        };
    }
}
