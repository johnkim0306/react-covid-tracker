import React from "react";
import { Paper } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@mui/material/useMediaQuery'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';
import {createTheme,ThemeProvider} from '@mui/material/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
    height: theme.spacing(15),
    margin: theme.spacing(1),
    background: 'linear-gradient(to right bottom, #E0C3FC, #8EC5FC)',
    borderRadius: 12
  },
  papers__footer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  papers__footer__left: {
    display:'flex'
  },
  papers__calendar: {
    display:'flex',
    flexDirection: 'column'
  },
  papers__calendar__text: {
    display:'flex'
  },
  paperContainer: {
    backgroundImage: 'logo192.png'
  },
  papers__text: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    "@media (max-width: 600px)": {
      fontSize: '.625rem'
    },
  },
  largeIcon: {
    marginBottom: '-1.1rem',
    marginRight: '-0.6rem'
  },
}));


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


export default () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
        <Paper elevation={10} className = {isMobile ?  classes.paper : classes.paper } >
          <div className={classes.papers__footer}>
            <div className={classes.papers__footer__left}>
    
                <CoronavirusRoundedIcon sx={ isMobile? { width: '4rem', height: '3rem'} : { width: '9rem', height: '8rem' } } className={classes.largeIcon}/>

              <div className={classes.papers__text}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" style={{color: 'white'}}>The Covid-19 Tracker</Typography>
                  <Typography sx={{ display: 'flex',justifyContent: 'space-between'}}variant="h5" color="primary">Click on a country name</Typography>
                </ThemeProvider>
              </div>
            </div>

            <div className={classes.papers__calendar}>
              <div>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" style={{color: 'white'}}>Last Updated:</Typography>
                </ThemeProvider>
              </div>
              <div className={classes.papers__calendar__text}>
                <CalendarMonthRoundedIcon/>
                <Typography color="textSecondary">
                      {" "}
                      {new Date().toLocaleString() + ""}
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
        <br />
    </>
  );
};
