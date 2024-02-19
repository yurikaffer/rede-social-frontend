import { Box, Link } from '@mui/material';
import { styled } from '@mui/system';

export const MoreInfosCardContainer = styled(Box)({
    width: '90%',
    backgroundColor: 'transparent',
});

export const MoreInfosCardLink = styled(Link)({
    variant: 'body2',
    textDecoration: 'none',
    fontFamily: 'sans-serif',
    fontSize: 14,
    color: 'gray',
    marginRight: 2,
    '&:hover': {
        textDecoration: 'underline',
    },
    paddingRight: 5,
    width: '100%'
});