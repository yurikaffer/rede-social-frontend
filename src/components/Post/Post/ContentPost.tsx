import { Box, Typography } from '@mui/material';
import React from 'react';
import { PostInterface } from '../../../interface/PostInterface';

interface ContentPostProp {
    post: PostInterface;
}

const ContentPost: React.FC<ContentPostProp> = ({ post }) => {

    function formatContent(content: string) {
        const lines = content.split('\n');
        return (
            <Box>
                {lines.map((line, index) => (
                    <Typography sx={{
                        backgroundColor: "#28343E",
                        borderRadius: 3,
                        padding: '10px 10px 10px 20px ',
                        marginTop: 1,
                        color: 'white',
                    }} fontSize={18} key={index}>
                        {line}
                    </Typography>
                ))}
            </Box>
        );
    }

    return (
        <Box display={'flex'} flexDirection={'column'} marginBottom={'10px'}>
            <Box >
                <Typography sx={{
                    backgroundColor: "#28343E",
                    borderRadius: 3,
                    marginTop: 1,
                    color: 'white',
                }} fontSize={18}>
                    {formatContent(post.content)}
                </Typography>
            </Box>

            {post.imgURL && (
                <Box mb={1} mt={2}>
                    <img
                        src={post.imgURL}
                        loading="lazy"
                        alt="postImg"
                        style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '5px', maxHeight: '600px' }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default ContentPost