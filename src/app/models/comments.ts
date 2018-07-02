export interface Comment {

    id: number;
    post: number;
    parent: number;
    author: number;
    author_name: string;
    date: string;
    content: any;
}
export interface CommentsList extends Array<Comment> {}
