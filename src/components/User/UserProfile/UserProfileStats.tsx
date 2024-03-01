import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/joy';
import { usePostList } from '../../../context/PostListContext';
import { useFollow } from '../../../context/FollowContext';

const UserProfileStats: React.FC<{userId: number}> = ({userId}) => {
    const { countPostsUser } = usePostList();
    const {followed, followers} = useFollow()

    const style = {
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        color: 'white',
        fontSize: 14,
        '@media (max-width: 550px)': {
            flexDirection: 'column',
        },
    }

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
            <Box sx={style} >
                <Typography fontWeight="bold" >{countPostsUser(userId)}</Typography>
                <Typography >posts</Typography>
            </Box>
            <Box sx={style} >
                <Typography fontWeight="bold">{followed}</Typography>
                <Typography >seguidores</Typography>
                
            </Box>
            <Box sx={style} >
                
                <Typography fontWeight="bold">{followers}</Typography>
                <Typography>seguindo</Typography>
            </Box>
        </Box>
    );
}

export default UserProfileStats;
