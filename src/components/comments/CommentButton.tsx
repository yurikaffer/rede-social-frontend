import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useComments } from '../../context/CommentsContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const CommentButton: React.FC = () => {
    const { isCommentOpen, setCommentOpen, setViewComments, commentsNumber } = useComments()

    const handleCommentClick = () => {
        if (isCommentOpen) {
            setCommentOpen(false)
            setViewComments(false)
        } else {
            setCommentOpen(true)
        }
    };

    return (
        <>
            <IconButton sx={{ ml: 1 }} color="secondary" onClick={handleCommentClick}>
                <ChatBubbleOutlineIcon fontSize='small' />
            </IconButton>
            <Typography color='white' fontSize='small'>{commentsNumber}</Typography>
        </>
    )
}

export default CommentButton