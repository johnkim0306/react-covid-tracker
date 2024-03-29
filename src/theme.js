import { createTheme } from '@mui/material/styles';

const theme = createTheme();
theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  };
  
  theme.typography.h5 = {
    fontSize: '1.2rem',
    '@media (max-width:600px)': {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };

export default theme;
