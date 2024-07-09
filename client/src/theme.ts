import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

export const light: ThemeOptions = {
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#9723C9',
    },
    background: {
      default: '#fcc7f3',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      // textTransform: 'uppercase',
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
    h5: {
      fontSize: '1.5rem',
      fontWeight: 700,
      fontFamily: 'Arial, sans-serif',
      // textTransform: 'lowercase',
      letterSpacing: '2px',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 700,
      fontFamily: 'Arial, sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#000",
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
}
export const dark: ThemeOptions = {
  palette: {
    primary: {
      main: '#942248',
    },
    secondary: {
      main: '#45115c',
    },
    background: {
      default: '#300d2c',
    },
    mode: "dark",
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
    h5: {
      fontSize: '1.5rem',
      fontWeight: 700,
      fontFamily: 'Arial, sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 700,
      fontFamily: 'Arial, sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#fff",
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
        outlined: {
          color: "#fff",
          borderColor: "#000",
        }
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
          backgroundColor: '#15202b',
          boxShadow: '5px 5px 0px #000',
        },
      },
    },
  },
}
const theme = createTheme(dark);


export default theme;


