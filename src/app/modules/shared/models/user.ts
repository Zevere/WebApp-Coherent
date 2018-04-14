import { TaskList } from './task-list';

export interface User {
    id: string;
    firstName: string;
    lastName?: string;
    token?: string;
    daysJoined: number;
    joinedAt: Date;
    lists?: TaskList[];
}
