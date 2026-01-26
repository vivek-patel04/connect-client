import { UserMiniType } from "../user/types";

export interface PostType {
    id: string;
    post: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
    user: UserMiniType;
    viewerLiked: boolean;
    viewerPost: boolean;
    likeCount: number;
    commentCount: number;
}

export interface FeedPostsType {
    nextCursor: {
        createdAt: string;
        id: string;
    };
    posts: PostType[];
}

export interface CommentType {
    id: string;
    postID: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
    user: UserMiniType;
    viewerComment: boolean;
    comment: string;
}

export interface CommentsType {
    comments: CommentType[];
    nextCursor: {
        createdAt: string;
        id: string;
    };
}

export interface LikeType {
    id: string;
    postID: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
    user: UserMiniType;
}

export interface LikesType {
    likes: LikeType[];
    nextCursor: {
        createdAt: string;
        id: string;
    };
}
