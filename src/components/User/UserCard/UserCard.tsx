import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { UserCardAvatar, UserCardContainer, UserCardImage, UserCardProfileLink, UserCardTextContainer, UserCardUsername } from './UserCardStyles';

const UserCard: React.FC = () => {
    const navigate = useNavigate();
    const { userLogged } = useUser();

    if (!userLogged) {
        return (<div>Carregando...</div>)
    }

    const handlleClickProfile = () => {
        navigate(`/user/${userLogged.id}`);
    }

    return (
        <UserCardContainer>
            <Box sx={{ width: '100%' }}>
                <UserCardImage alt="background" src='/fundo-usuário.jpg' />
            </Box>

            <Box>
                <UserCardAvatar src={userLogged.filePath} alt="avatar" />

                <UserCardTextContainer>
                    <Typography sx={{ color: "white" }} fontSize={20}>{userLogged.name}</Typography>
                    <UserCardUsername >{'@' + userLogged.userName}</UserCardUsername>
                    <Typography sx={{ color: "white" }} fontSize={14} ml={2} mr={2} mt={2}>{userLogged.biography}</Typography>
                </UserCardTextContainer>
            </Box>

            <Box borderBottom={1.8} borderColor='#323d45' width="100%"/>

            <UserCardProfileLink onClick={handlleClickProfile}>
                Meu Perfil
            </UserCardProfileLink>
        </UserCardContainer>
    );
};

export default UserCard;