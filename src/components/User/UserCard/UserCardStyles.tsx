import { Avatar, Box, Card, Typography } from "@mui/material";
import { styled } from '@mui/system';

export const UserCardContainer = styled(Card)({
    width: '100%',
    backgroundColor: '#1B2730',
    borderRadius: 15,
    color: 'white',
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
});

export const UserCardImage = styled('img')({
    objectFit: 'cover',
    width: '100%',
    height: '100px',
});

export const UserCardAvatar = styled(Avatar)({
    top: -45,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 80,
});

export const UserCardTextContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    position: 'relative',
    top: -25,
    
});

export const UserCardUsername = styled(Typography)({
    color: 'gray',
    marginBottom: 1,
    fontSize: 14,
});

export const UserCardProfileLink = styled(Typography)({
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