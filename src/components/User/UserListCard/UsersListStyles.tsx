import { Box, ButtonBase, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const UsersListCardContainer = styled(Card)({
    width: '100%',
    backgroundColor: '#1B2730',
    borderRadius: 15,
});

export const UserListItemContainer = styled(Box)({
    display: 'flex',
    marginBottom: '10px',
    marginLeft: 15,
    alignSelf: 'start',
    width: '90%',
    alignContent: 'center',
});

export const ProfileButtonBase = styled(ButtonBase)({
    width: '80px',
    color: 'whitesmoke',
    backgroundColor: '#28343E',
    padding: 7,
    borderRadius: 5,
    transition: '0.5s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#323d45',
    },
});

export const ViewMoreTypography = styled(Typography)({
    color: '#1976D2',
    fontSize: 14,
    padding: 15,
    width: '100%',
    textAlign: 'center',
    transition: '0.5s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#323d45',
    },
});