import { TaskItem } from './task-item';
import { Comment } from './comment';

export interface TaskList {
    id: string;
    ownerId: string;
    title: string;
    createdAt: Date;
    description?: string;
    comments?: Comment[];
    tags?: string[];
    tasks?: TaskItem[];
}
