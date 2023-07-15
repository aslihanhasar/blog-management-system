export interface Post {
    [key: string]: any;
    postId: Number,
    userId: Number,
    categoryId: Number,
    title: string,
    content: string,
    viewCount: number,
    creationDate: string,
    isPublished: boolean
}
