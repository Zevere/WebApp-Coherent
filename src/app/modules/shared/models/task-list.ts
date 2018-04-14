import { Comment } from './comment';

export interface TaskList {
    id: string;
    title: string;
    createdAt: Date;
    description?: string;
    comments?: Comment[];
    tags?: string[];
    tasks?: any[];
}
