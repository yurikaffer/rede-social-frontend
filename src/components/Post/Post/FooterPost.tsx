import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import LikeButton from '../LikeButton';
import { PostInterface } from '../../../interface/PostInterface';
import { useComments } from '../../../context/CommentsContext';
import CommentButton from '../../comments/CommentButton';

const FooterPost: React.FC<{post: PostInterface}> = ({ post }) => {
    const { viewComments, setViewComments, commentsNumber, setCommentsNumber } = useComments()

    useEffect(() => {
        setCommentsNumber(post.comments.length)
    }, []);

    return (
        <Box display="flex" alignItems={'center'}>
            <LikeButton post={post} />
            <CommentButton/>

            <Box paddingLeft={2}>
                {commentsNumber >= 1 && (
                    <Typography sx={{ cursor: 'pointer' }} color={'gray'} fontSize={14} onClick={() => { setViewComments(viewComments ? false : true) }}>
                        {viewComments ? 'Recolher comentários' : 'Ver comentários'}
                    </Typography>
                )}
            </Box>
        </Box>

    )
}

export default FooterPost