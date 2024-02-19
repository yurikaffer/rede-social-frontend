import Typography from '@mui/joy/Typography';
import { UserInterface } from '../../../interface/UserInterface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../../api/Service/UserService';
import ImgUserProfile from './ImgUserProfile';
import UserProfileStats from './UserProfileStats';
import UserCardButton from './UserCardButton';
import { Box } from '@mui/material';
import { formatTime } from '../../../utils/DateUtils';
import { useUser } from '../../../context/UserContext';
import { styled } from '@mui/system';
import { FollowProvider } from '../../../context/FollowContext';

const UserProfileCard: React.FC = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState<UserInterface>();
    const { userLogged } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                (Number(userId) === userLogged?.id) ? setUserData(userLogged) :
                    setUserData(await UserService.getUser(userId))
            }
        };
        fetchData();
    }, [userId, userLogged]);

    if (!userData) {
        return <div>Carregando...</div>;
    }

    const CardContainer = styled(Box)({
        boxSizing: 'border-box',
        borderRadius: 15,
        padding: 15,
        display: 'flex',
        fontFamily: 'sans-serif',
    });

    return (
            <CardContainer >
                <FollowProvider userId={Number(userId)}>
                <Box display={'flex'} width={'100%'} justifyContent={'center'}>
                    <ImgUserProfile user={userData} />

                    <Box display={'flex'} flexDirection={'column'} ml={5} width={'60%'}>

                        <Box display={'flex'} >
                            <Typography sx={{ color: 'gray', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis'  }} fontSize={16} mb={1}>
                                @{userData.userName}
                            </Typography>

                            <Typography sx={{ color: 'gray' }} marginLeft={'auto'}>
                                Membro há {formatTime(String(userData.createdAt), true)}
                            </Typography>
                        </Box>

                        <UserProfileStats userId={Number(userId)} />

                        <Typography sx={{ color: 'white', maxWidth: '500px', overflowWrap: 'break-word'}} fontSize={16} mt={1} fontWeight="bold">
                            {userData.name}
                        </Typography>

                        <Typography sx={{ color: 'whitesmoke', overflowWrap: 'break-word', maxWidth: '500px' }} mt={1} mb={'auto'} fontSize={14} >
                            {userData.biography}
                        </Typography>

                        <UserCardButton userId={Number(userId)} />

                    </Box>

                </Box>
                </FollowProvider>
                
            </CardContainer>
    );
}

export default UserProfileCard;