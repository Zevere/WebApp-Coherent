export interface TaskList {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    tasks?: any[];
}
