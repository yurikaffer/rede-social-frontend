import { Box, IconButton, InputBase } from '@mui/material';
import { styled } from '@mui/system';

export const StyledBox = styled(Box)({
    borderRadius: 15,
    backgroundColor: '#1B2730',
    padding: 20,
    marginTop: 23,
    marginBottom: 15,
    width: '100%',
    boxSizing: 'border-box', // Adicionado para garantir que a largura inclua a padding
});

export const StyledInputBase = styled(InputBase)({
    backgroundColor: "#28343E",
    borderRadius: 10,
    padding: '10px 10px 10px 20px',
    marginLeft: 10,
    color: 'white',
});

export const StyledImage = styled('img')({
    objectFit: 'cover',
    width: '90%',
    height: '100%',
    borderRadius: '5px',
});

export const StyledIconButton = styled(IconButton)({
    position: 'relative', 
    bottom: '50px', 
    right: '10px', 
    backgroundColor: 'transparent', 
    borderRadius: '10%'
});