import React, { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';
import FollowService from '../../../api/Service/FollowService';
import { useUser } from '../../../context/UserContext';
import EditUserProfile from './EditUserProfile';
import { useFollow } from '../../../context/FollowContext';

interface UserCardButtonProps {
    userId: number
}

const UserCardButton: React.FC<UserCardButtonProps> = ({ userId }) => {
    const { userLogged } = useUser()
    const [isFollowing, setIsFollowing] = useState<boolean>();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [followModelId, setFollowModelId] = useState<number>();
    const { followed, setFollowed } = useFollow()

    useEffect(() => {
        const fetchData = async () => {
            if (userLogged?.id && userId) {
                //valda se um usuário segue o outro e retorna o id do user que ta sendo seguido
                const followId = await FollowService.isUserFollowed(userLogged?.id, Number(userId))

                if (followId) {
                    setIsFollowing(true)
                    setFollowModelId(followId)
                }
            }
        }
        fetchData();
    }, [userId, userLogged?.id]);

    const handleUnFollow = async () => {
        if (followModelId) {
            await FollowService.unfollowUser(followModelId);
            setIsFollowing(false)
            setFollowed(followed - 1)
        }
    };

    const handleFollow = async () => {
        if (userId && userLogged) {
            const followId = await FollowService.createFollow(userLogged?.id, Number(userId));
            setFollowModelId(followId.id)
            setIsFollowing(true)
            setFollowed(followed + 1)
        }
    };

    const handleButtonClick = () => {
        if (Number(userId) !== userLogged?.id) {
            if (isFollowing) {
                handleUnFollow();
            } else {
                handleFollow();
            }
        } else {
            handleToggleEditProfile();
        }
    };

    const handleToggleEditProfile = () => { // Função para alternar entre abrir e fechar a modal
        setIsEditingProfile(prevState => !prevState);
    };

    return (
        <>
            <ButtonBase
                sx={{
                    width: '50%',
                    color: 'whitesmoke',
                    backgroundColor: '#28343E',
                    padding: 1,
                    marginLeft: 'auto',
                    mt: 1,
                    borderRadius: 2,
                    '@media (max-width: 720px)': {
                        width: '100%',
                    },
                }}
                onClick={handleButtonClick}
            >
                {Number(userId) !== userLogged?.id ? (isFollowing ? 'Deixar de seguir' : 'Seguir') : 'Editar informações'}
            </ButtonBase>

            {isEditingProfile && (<EditUserProfile isOpen={isEditingProfile} onClose={handleToggleEditProfile} />)}
        </>
    );
};

export default UserCardButton;
