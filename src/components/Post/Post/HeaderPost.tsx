import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { PostInterface } from '../../../interface/PostInterface';
import { useUser } from '../../../context/UserContext';
import { OptionButton } from '../../Option/OptionButton';
import { formatTime } from '../../../utils/DateUtils';

interface HeaderPostProp {
    post: PostInterface;
}

const handleUserSelected = (id: number) => {
    window.open(`/user/${id}`, '_blank');
}

const HeaderPost: React.FC<HeaderPostProp> = ({ post }) => {
    const { userLogged } = useUser()
    return (

            <Box display={'flex'} alignItems={'center'} marginBottom={'5px'} >

                <Tooltip title={post.user.name}>
                    <IconButton sx={{ padding: 0 }} onClick={() => handleUserSelected(post.user.id)}>
                        <Avatar sx={{ width: 42, height: 42 }} src={post.user.filePath} />
                    </IconButton>
                </Tooltip>

                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <Box display={'flex'} alignItems={'center'} >
                        <Typography onClick={() => handleUserSelected(post.user.id)} sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer'
                        }}
                            color={'white'} fontSize={20} marginLeft={2}
                        >
                            {post.user.name}
                        </Typography>

                        <Typography sx={{ cursor: 'pointer' }} onClick={() => handleUserSelected(post.user.id)} color={'gray'} variant="caption" marginLeft={1}>
                            @{post.user.userName}
                        </Typography>

                        {post.user.id === userLogged?.id && (
                            <OptionButton post={post} />
                        )}

                    </Box>
                    <Typography variant="caption" marginLeft={2} color='gray'>{formatTime(String(post.createdAt), true)}</Typography>
                </Box>

            </Box>


    )
}

export default HeaderPost