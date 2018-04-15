import { TaskItem } from './task-item';
import { Comment } from './comment';

export interface TaskList {
    id: string;
    owner: string;
    title: string;
    createdAt: Date;
    description?: string;
    collaborators?: string[];
    comments?: Comment[];
    tags?: string[];
    tasks?: TaskItem[];
    updatedAt?: Date;
}
