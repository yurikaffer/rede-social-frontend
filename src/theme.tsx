import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: 'white', // Cor do texto da label
          },
          '& input': {
            color: 'white', // Cor do texto do campo de entrada
            borderColor: 'gray', // Cor do contorno
            backgroundColor: '#28343E',
            borderRadius: 5,
            border: 'none'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Cor do contorno quando o campo não está focado
            border: 'none'

          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Cor do contorno ao passar o mouse
            border: 'none'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Cor do contorno quando o campo está focado
            border: 'none'
          },
          
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#FFF' 
    },
    secondary: {
      main: '#0091FF' 
    },
  }
});

export default theme;
