import { getTagValue } from '../helpers/tag-helpers';

export class TaskItemTags {
    kind: string;
    stage: string;
    progress: number;
    priority: string;

    constructor(tags: string[]) {
        this.kind = getTagValue(tags, '_kind');
        this.stage = getTagValue(tags, '_stage');
        this.progress = +getTagValue(tags, '_progress');
        this.priority = getTagValue(tags, '_priority');

        if (this.priority) {
            this.priority = getPriorityLevel(this.priority);
        }
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
