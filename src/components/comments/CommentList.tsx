import React from 'react';
import { PostInterface } from '../../interface/PostInterface';
import { Box } from '@mui/material';
import { OptionButton } from '../Option/OptionButton';
import { useComments } from '../../context/CommentsContext';
import Comment from './Comment';
import { useUser } from '../../context/UserContext';

const CommentList: React.FC<{post: PostInterface}> = ({ post }) => {
    const { viewComments } = useComments()
    const { userLogged } = useUser()
    return (
        <>
            {viewComments && post.comments
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((comment) => (
                    <Box display={'flex'} >
                        <Comment comment={comment} />

                        <Box display={'flex'} marginLeft={'auto'} marginBottom={1} paddingRight={1.5}>
                            {comment.user.id === (userLogged?.id || 0) && (
                                <OptionButton
                                    post={post}
                                    comment={comment}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
        </>
    )
}

export default CommentList