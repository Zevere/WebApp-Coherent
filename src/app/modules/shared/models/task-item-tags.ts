import { getTagValue } from '../helpers/tag-helpers';
import { KeyValuePair } from '../helpers/key-value-pair';
import { TaskItem } from './task-item';

export class TaskItemTags {
    public static stages: KeyValuePair<string>[] = [
        {key: 'Backlog', value: 'backlog'},
        {key: 'To Do', value: 'todo'},
        {key: 'In Progress', value: 'in_progress'},
        {key: 'Done', value: 'done'},
    ];

    public static priorities: KeyValuePair<string>[] = [
        {key: 'Low', value: 'low'},
        {key: 'Medium', value: 'medium'},
        {key: 'High', value: 'high'},
    ];

    public static specialTagNames = ['_kind', '_stage', '_progress', '_priority'];

    kind: string;
    stage: string;
    progress: number;
    priority: string;

    constructor(tags: string[]) {
        this.kind = getTagValue(tags, '_kind');
        this.stage = getTagValue(tags, '_stage');
        this.progress = +getTagValue(tags, '_progress');
        this.priority = getTagValue(tags, '_priority');

        if (isNaN(this.progress)) {
            this.progress = null;
        }

        if (this.priority) {
            this.priority = getPriorityLevel(this.priority);
        }
    }

    public static getUserTags(task: TaskItem) {
        return task.tags.filter(tag => !tag.startsWith('_'));
    }
}

function getPriorityLevel(priority: string): string {
    const priorityNumber = parseFloat(priority);
    if (isNaN(priorityNumber)) {
        return priority;
    } else {
        if (priorityNumber <= 35) {
            return 'low';
        } else if (priorityNumber <= 70) {
            return 'medium';
        } else {
            return 'high';
        }
    }
}
