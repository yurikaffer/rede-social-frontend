import { Box, Divider, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const NavbarBox = styled(Box)({
    backgroundColor: '#06141D',
    paddingRight: '11%',
    '@media (max-width: 1400px)': {
        paddingRight: '1%',
    },
});

export const NavbarContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem',
});

export const NavbarSectionHome = styled(Box)({
    display: "flex",
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingLeft: "10%",
    '@media (max-width: 1400px)': {
        paddingLeft: 0,
    },
});

export const NavbarIconsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
});

export const NavbarDivider = styled(Divider)({
    borderLeft: '1px solid gray',
    marginBottom: 10,
    marginTop: 10,
    color: 'gray',
});

export const NavbarAvatarBox = styled(Box)({
    backgroundColor: '#28343E',
    borderRadius: '20px',
    marginLeft: '1.5rem',
});

export const NavbarMenuItem = styled(MenuItem)({
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'white',
    },
});

export const TypographyUserName = styled(Typography)({
    color: 'white',
    paddingLeft: 10,
    fontSize: 15,
    whiteSpace: 'nowrap', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis',
    '@media (max-width: 620px)': {
        display: 'none'
    },
});