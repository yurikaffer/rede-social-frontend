import React from 'react';
import { Box } from '@mui/material';
import { PostInterface } from '../../../interface/PostInterface';
import CommentUserBox from '../../comments/CommentUserBox';
import HeaderPost from './HeaderPost';
import ContentPost from './ContentPost';
import FooterPost from './FooterPost';
import { CommentsProvider } from '../../../context/CommentsContext';
import CommentList from '../../comments/CommentList';

const Post: React.FC<{post: PostInterface}> = ({ post }) => {
    return (
        <Box sx={{
            borderRadius: 3,
            backgroundColor: '#1B2730',
            padding: '15px 25px 10px 25px',
            marginTop: 2,
            width: '100%',
            boxSizing: 'border-box', // Adicionado para garantir que a largura inclua a padding
        }}>
            <HeaderPost post={post}/>
            <ContentPost post={post}/>
            <CommentsProvider>
                <CommentUserBox post={post}/>
                <CommentList post={post}/>
                <FooterPost post={post}/>
            </CommentsProvider>
        </Box>
    );
};

export default Post;
