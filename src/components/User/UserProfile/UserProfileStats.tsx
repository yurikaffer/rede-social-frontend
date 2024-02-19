import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/joy';
import { usePostList } from '../../../context/PostListContext';
import { useFollow } from '../../../context/FollowContext';

const UserProfileStats: React.FC<{userId: number}> = ({userId}) => {
    const { countPostsUser } = usePostList();
    const {followed, followers} = useFollow()

    return (
        <Box sx={{
                bgcolor: '#28343E',
                borderRadius: 1,
                p: 1,
                my: 1,
                display: 'flex',
                gap: 2,
                '& > div': { flex: 1 },
            }}
        >
            <Box display={'flex'}  alignItems={'center'} gap={0.5} color={'white'} fontSize={14}>
                <Typography fontWeight="bold" >{countPostsUser(userId)}</Typography>
                <Typography >Posts</Typography>
            </Box>
            <Box display={'flex'}  alignItems={'center'} gap={0.5} color={'white'} fontSize={14}>
                <Typography fontWeight="bold">{followed}</Typography>
                <Typography >Seguidores</Typography>
                
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={0.5} color={'white'} fontSize={14}>
                
                <Typography fontWeight="bold">{followers}</Typography>
                <Typography>Seguindo</Typography>
            </Box>
        </Box>
    );
}

export default UserProfileStats;