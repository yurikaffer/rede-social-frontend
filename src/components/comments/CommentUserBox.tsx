import React from 'react';
import { Avatar, Box, Button, FormControl, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useUser } from '../../context/UserContext';
import { useComments } from '../../context/CommentsContext';
import { PostInterface } from '../../interface/PostInterface';
import CommentService from '../../api/Service/CommentService';

const CommentUserBox: React.FC<{post: PostInterface}> = ({ post }) => {
    const { isCommentOpen, commentText, setCommentText, commentsNumber, setCommentsNumber } = useComments()
    const { userLogged } = useUser()

    const handleCommentSubmit = async () => {

        if (commentText.trim() !== '') {
            try {
                const newComment = await CommentService.addComment(post.id, commentText);
                post.comments.unshift(newComment)
                setCommentsNumber(commentsNumber + 1)
                setCommentText('');
            } catch (error) {
                console.error('Erro ao adicionar o comentário:', error);
            }
        }
    };

    return (
        <>
            {isCommentOpen && (
            <Box display={'flex'} flexDirection={'column'} marginLeft={'14px'}>
                <Box display={'flex'} alignItems={'center'} marginBottom={'10px'}>
                    <Avatar sx={{ width: 30, height: 30 }} alt="" src={userLogged?.filePath} />
                    <FormControl sx={{ width: '95%' }}>
                        <InputBase
                            multiline
                            fullWidth
                            placeholder="Digite seu comentário"
                            onChange={(event) => setCommentText(event.target.value)}
                            value={commentText}
                            sx={{
                                backgroundColor: "#28343E",
                                borderRadius: 3,
                                padding: '10px 10px 10px 20px ',
                                marginLeft: '10px',
                                color: 'white',
                            }}
                        />
                    </FormControl>
                    <Button sx={{ borderRadius: 5, textTransform: 'none', marginLeft: '10px' }} color="secondary" onClick={handleCommentSubmit} endIcon={<SendIcon />} />
                </Box>
            </Box>
            )}
        </>
    );
};

export default CommentUserBox;