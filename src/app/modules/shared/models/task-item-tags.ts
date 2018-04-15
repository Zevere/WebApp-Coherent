import { getTagValue } from '../helpers/tag-helpers';

export class TaskItemTags {
    kind: string;
    stage: string;
    progress: string;
    priority: string;

    constructor(tags: string[]) {
        this.kind = getTagValue(tags, '_kind');
        this.stage = getTagValue(tags, '_stage');
        this.progress = getTagValue(tags, '_progress');
        this.priority = getTagValue(tags, '_priority');
    }
}

