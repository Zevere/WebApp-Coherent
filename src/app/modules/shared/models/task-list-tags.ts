import { getTagValue } from '../helpers/tag-helpers';

export class TaskListTags {
    kind: string;
    icon: string;

    constructor(tags: string[]) {
        this.kind = getTagValue(tags, '_kind');
        this.icon = getTagValue(tags, '_icon');
    }
}

