import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CommentsContextProps {
    isCommentOpen: boolean;
    commentText: string;
    viewComments: boolean,
    commentsNumber: number,
    setCommentOpen: (arg: boolean) => void;
    setCommentText: (arg: string) => void;
    setViewComments: (arg: boolean) => void;
    setCommentsNumber: (arg: number) => void;
}

const CommentsContext = createContext<CommentsContextProps>({ 
    isCommentOpen: false,
    commentText: '',
    viewComments: false,
    commentsNumber: 0,
    setCommentOpen: () => { },
    setCommentText: () => { },
    setViewComments: () => { },
    setCommentsNumber: () => { },
});

export const CommentsProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [isCommentOpen, setCommentOpen] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [viewComments, setViewComments] = useState<boolean>(false);
    const [commentsNumber, setCommentsNumber] = useState(0);

    return (
        <CommentsContext.Provider 
            value={{ isCommentOpen, setCommentOpen, commentText, setCommentText, viewComments, setViewComments, commentsNumber, setCommentsNumber }}>
            {children}
        </CommentsContext.Provider>
    );
};

export const useComments = () => useContext(CommentsContext);
