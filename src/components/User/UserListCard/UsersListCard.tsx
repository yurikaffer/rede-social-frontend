import { Avatar, Box, Typography } from '@mui/material';
import { UserInterface } from '../../../interface/UserInterface';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserService from '../../../api/Service/UserService';
import { ProfileButtonBase, UserListItemContainer, UsersListCardContainer, ViewMoreTypography } from './UsersListStyles';

const UsersListCard: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState<UserInterface[]>();

    useEffect(() => {
        const fetchUsers = async () => {
            setUserList(await UserService.getUsersFromHome());
        };
        fetchUsers();
    }, []);

    const handlleClickProfile = (id: number): void => {
        navigate(`/user/${id}`);
    };

    const renderUserList = () => {
        return (
            userList?.map((user) => (
                <UserListItemContainer key={user.id}>
                    <Avatar sx={{ width: 42, height: 42 }} src={user.filePath} />
                    <Box display="flex" flexDirection="column" flexGrow={1} marginLeft={1}>
                        <Typography color="white" fontSize={16} marginLeft={1}>
                            {user.name}
                        </Typography>
                        <Typography sx={{ cursor: 'pointer' }} color={'gray'} variant="caption" marginLeft={1}>
                            @{user.userName}
                        </Typography>
                    </Box>
                    <Box alignSelf="center">
                        <ProfileButtonBase onClick={() => handlleClickProfile(user.id)}>
                            Perfil
                        </ProfileButtonBase>
                    </Box>
                </UserListItemContainer>
            ))
        );
    };

    return (
        <UsersListCardContainer>
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                <Typography padding={2} fontSize={18} color="white">
                    Conheça novos usuários!
                </Typography>
                <Box borderBottom={1.8} borderColor="#323d45" width="100%" mb={2} />
                {renderUserList()}
                <Box borderBottom={1.8} borderColor="#323d45" width="100%" mt={1} />
                <ViewMoreTypography>
                    Ver mais
                </ViewMoreTypography>
            </Box>
        </UsersListCardContainer>
    );
};

export default UsersListCard;