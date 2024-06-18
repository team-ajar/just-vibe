import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#000',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          textTransform: 'none',
          boxShadow: '5px 5px 0px #000',
          '&:hover': {
            boxShadow: '7px 7px 0px #000',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          boxShadow: '10px 10px 0px #000',
          border: '2px solid #000',
          marginBottom: '20px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          border: '2px solid #000',
          backgroundColor: '#fff',
          boxShadow: '5px 5px 0px #000',
        },
      },
    },
  },
});

export default theme;
