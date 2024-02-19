import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PostInterface } from '../interface/PostInterface';

interface PostListContextProps {
    postList: PostInterface[] | null;
    setPosts: (postList: PostInterface[]) => void;
    addPost: (post: PostInterface) => void;
    deletePost: (postId: number) => void;
    countPostsUser: (userId: number) => number;
    deleteComment: (postId: number, commentId: number) => void;
}

const PostListContext = createContext<PostListContextProps>({
    postList: null,
    setPosts: () => {},
    addPost: () => {},
    deletePost: () => {},
    countPostsUser: () => 0,
    deleteComment: () => {}
});

export const PostListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [postList, setPostList] = useState<PostInterface[] | null>(null);

    const setPosts = (postList: PostInterface[]) => {
        setPostList(postList);
    };

    const addPost = (post: PostInterface) => {
        // Verifica se o post não possui as propriedades comments e likes
        if (!post.comments) {
            post.comments = [];
        }
        if (!post.likes) {
            post.likes = [];
        }
    
        if (postList) {
            setPosts([post, ...postList]);
        } else {
            setPosts([post]);
        }
    };

    const deletePost = (postId: number) => {
        if (postList) {
            const updatedPosts = postList.filter(post => post.id !== postId);
            setPosts(updatedPosts);
        }
    };

    const deleteComment = (postId: number, commentId: number) => {
        setPostList(prevPostList => {
            const updatedPosts = prevPostList!.map(post => {
                if (post.id === postId) {
                    const updatedComments = post.comments.filter(comment => comment.id !== commentId);
                    return {
                        ...post,
                        comments: updatedComments
                    };
                }
                return post;
            });
            return updatedPosts;
        });
    };

    const countPostsUser = (userId: number): number => {
        if (postList) {
            const postsByUser = postList.filter(post => post.user.id === userId);
            return postsByUser.length
        } else return 0
    };

    return (
        <PostListContext.Provider value={{ postList, setPosts, addPost, deletePost, countPostsUser, deleteComment }}>
            {children}
        </PostListContext.Provider>
    );
};

export const usePostList = () => useContext(PostListContext);
