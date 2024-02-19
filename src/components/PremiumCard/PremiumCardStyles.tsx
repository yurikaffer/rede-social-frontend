import { Box, ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const PremiumCardContainer = styled(Box)({
    width: '100%',
    backgroundColor: '#1B2730',
    borderRadius: 10,
    color: 'white',
});

export const PremiumCardTitle = styled(Typography)({
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 22,
});

export const PremiumCardText = styled(Typography)({
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 15,
});

export const PremiumCardButton = styled(ButtonBase)({
    width: '100%',
    color: 'whitesmoke',
    backgroundColor: '#28343E',
    padding: 10,
    borderRadius: 5,
    transition: '0.5s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#323d45',
    },
});