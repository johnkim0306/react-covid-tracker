import React from "react";
import { Paper,Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Directions } from "@material-ui/icons";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';

const useStyles = makeStyles(theme => ({
  paper: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
    height: theme.spacing(15),
    margin: theme.spacing(2),
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
    display:'flex'
  },
  paperContainer: {
    backgroundImage: 'logo192.png'
  },
  papers__text: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  largeIcon: {
    marginBottom: '-1.1rem',
    marginRight: '-0.6rem'
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <>
        <Paper elevation={10} className={classes.paper} >
          <div className={classes.papers__footer}>
            <div className={classes.papers__footer__left}>
    
                <CoronavirusRoundedIcon sx={{ width: '9rem', height: '8rem' }} className={classes.largeIcon}/>

              <div className={classes.papers__text}>
                <Typography variant="h5" style={{color: 'white'}}>The Covid-19 Tracker</Typography>
                <Typography sx={{ display: 'flex',justifyContent: 'space-between'}}variant="h6" color="primary">Click on a country name</Typography>
              </div>
            </div>

            <div className={classes.papers__calendar}>
              <CalendarMonthRoundedIcon/>
              <Typography color="textSecondary">
                    {" "}
                    {new Date().toLocaleString() + ""}
              </Typography>
            </div>
          </div>
        </Paper>
        <br />
    </>
  );
};