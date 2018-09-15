export interface Comment {
    id: string;
    text?: string;
    authorId: string;
    postedAt: Date;
    modifiedAt?: Date;
    status: string;
}
