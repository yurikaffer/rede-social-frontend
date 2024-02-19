import { IconButton, Typography } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { PostInterface } from '../../interface/PostInterface';
import LikeService from '../../api/Service/LikeService';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useUser } from '../../context/UserContext';

interface LikeButtonProps {
    post: PostInterface;
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [likeId, setLikeId] = useState<number>()
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { userLogged } = useUser()

    useLayoutEffect(() => {
        const likedByCurrentUser = post.likes.some((mapLike) => {
            if (mapLike.user.id === userLogged?.id) {
                setLikeId(mapLike.id)
                return true
            }
            return false
        });
        setIsLiked(likedByCurrentUser);
    }, []);

    const handleLikePost = async () => {
        if (!isLiked) {
            const likePost = await LikeService.likePost(post.id)
            setLikeId(likePost.id)
            setIsLiked(true)
            setLike(like + 1)

        } else if (isLiked && likeId) {
            if (await LikeService.removeLikePost(likeId)) {
                setIsLiked(false)
                setLike(like - 1)
                setLikeId(undefined)
            }
        }
    }

    return (
        <>
            <IconButton color="secondary" onClick={() => handleLikePost()}>
                {isLiked ? <FavoriteIcon fontSize='small' style={{ color: "red" }} /> : <FavoriteBorderIcon fontSize='small' />}
            </IconButton>
            <Typography color='white' fontSize='small' >{like}</Typography>
        </>

    )
}

export default LikeButton