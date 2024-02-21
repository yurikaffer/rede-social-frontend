import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import AuthService from '../../api/Service/AuthService';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useUser } from '../../context/UserContext';
import { NavbarAvatarBox, NavbarBox, NavbarContainer, NavbarDivider, NavbarIconsContainer, NavbarMenuItem, NavbarSectionHome, TypographyUserName } from './NavbarStyles';
import { Box } from '@mui/material';

function Navbar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { userLogged, setUser } = useUser();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        AuthService.logout()
        setUser(null)
        navigate('/login');
    }

    const navigateToHome = async () => {
        navigate('/home');
    }

    const handleUserProfile = async () => {
        navigate(`/user/${userLogged?.id}`);
    }

    const getFirstName = (name: string): string => {
        const pName = name.split(' ');
        return pName[0] 
    }

    if (!userLogged) {
        return (<div>Carregando...</div>)
    }

    return (
        <NavbarBox position="static">
            <NavbarContainer>
                <NavbarSectionHome >
                    <IconButton onClick={navigateToHome}>
                        <HomeIcon fontSize='large' color='secondary' />
                    </IconButton>
                    <Box sx={{'@media (max-width: 550px)': {display: 'none'} }}>
                        <Search />
                    </Box>
                </NavbarSectionHome>

                <NavbarIconsContainer>
                    <IconButton size="large" color="secondary">
                        <MailIcon />
                    </IconButton>

                    <IconButton sx={{ paddingRight: '10%' }} size="large" color="secondary">
                        <NotificationsIcon />
                    </IconButton>

                    <NavbarDivider orientation="vertical" variant="middle" flexItem />

                    <NavbarAvatarBox>
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar sx={{ width: 32, height: 32 }} src={userLogged.filePath} />
                            <TypographyUserName >
                                {getFirstName(userLogged.name)}
                            </TypographyUserName>
                            <ArrowDropDownIcon sx={{ paddingLeft: 1 }} color='secondary' />
                        </IconButton>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <NavbarMenuItem onClick={handleUserProfile}>Perfil</NavbarMenuItem>
                            <NavbarMenuItem onClick={handleLogout}>Sair</NavbarMenuItem>
                        </Menu>
                    </NavbarAvatarBox>
                </NavbarIconsContainer>
            </NavbarContainer>
            <Box sx={{display: 'none', '@media (max-width: 550px)': {display: 'flex'} }}>
                <Search />
            </Box>
        </NavbarBox>
    );
}

export default Navbar;