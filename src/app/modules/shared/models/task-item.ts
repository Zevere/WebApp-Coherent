export interface TaskItem {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    tasks?: any[];
}
