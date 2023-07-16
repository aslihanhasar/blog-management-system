export interface Comment {
    [key: string]: any;
    commentId: Number,
    postId: Number,
    userId: Number,
    comment: string,
    creationDate: string,
    isConfirmed: boolean
}
