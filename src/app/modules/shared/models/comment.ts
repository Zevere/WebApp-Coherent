export interface Comment {
    id: string;
    text?: string;
    author: string;
    postedAt: Date;
    modifiedAt?: Date;
    status: string;
}
