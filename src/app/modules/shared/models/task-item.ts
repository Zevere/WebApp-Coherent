import { Comment } from './comment';

export interface TaskItem {
    id: string;
    creator: string;
    list: string;
    title: string;
    createdAt: Date;
    description?: string;
    tags?: string[];
    comments?: Comment[];
}
