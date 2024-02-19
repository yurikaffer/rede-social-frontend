import { Avatar, Box, IconButton, InputBase, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { FormControl } from '@mui/material';
import { CommentInterface } from '../../interface/CommentInterface';
import { formatTime } from '../../utils/DateUtils';

interface commentProps {
    comment: CommentInterface
}

const Comment: React.FC<commentProps> = ({ comment }) => {

    const handleUserSelected = (id: number) => {
        window.open(`/user/${id}`, '_blank');
    }

    return (
        <>
            <Box display={'flex'} alignItems={'center'} marginBottom={'10px'} marginLeft={'14px'} width={'100%'}>

                <Tooltip title={comment.user.name}>
                    <IconButton sx={{ padding: 0 }} onClick={() => handleUserSelected(comment.user.id)}>
                        <Avatar sx={{ width: 30, height: 30 }} src={comment.user.filePath} />
                    </IconButton>
                </Tooltip>

                <FormControl sx={{ width: '85%' }}>
                    <InputBase
                        readOnly
                        multiline
                        fullWidth
                        value={comment.content}
                        key={comment.id}
                        sx={{
                            backgroundColor: "#28343E",
                            borderRadius: 3,
                            padding: '10px 10px 10px 20px ',
                            marginLeft: '10px',
                            color: 'white',
                            width: '100%'
                        }}
                    />
                </FormControl>
                <Typography variant="caption" marginLeft={2} color='gray'>{formatTime(String(comment.createdAt))}</Typography>
                
            </Box>
        </>
    );
}

export default Comment;
