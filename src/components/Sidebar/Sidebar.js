import React from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import LanguageIcon from '@mui/icons-material/Language';
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';
import './Sidebar.scss';

const useStyles = makeStyles(theme => ({
  button: {
    height: theme.spacing(7),
    // borderColor: theme.palette.secondary.main,
    color: 'black',
    background: 'white',
    borderColor: 'text.primary',
    borderRadius: 3,
    width: '100%',
    padding: '0.5rem',
    '& .MuiSvgIcon-root': {
      color: 'black', // Style the icon to inherit the color
      verticalAlign: 'middle', // Align the icon vertically
    },
}}));


const Sidebar = ({activateCanada, activateWorldWide }) => {
  const classes = useStyles();

  return (
    <div className="sidebar">
        <div className="sidebar__title">
          <h1 className="sidebar__title--text"> CORONA LIVE </h1>
        </div>
        <div className="btn-group">
          <Button variant="outlined" color="secondary" size="large" className={classes.button} onClick={activateCanada}> <SportsHockeyIcon />Canada </Button>
          <Button variant="outlined" color="secondary" size="large" className={classes.button} onClick={activateWorldWide}> <LanguageIcon />Worldwide</Button>
        </div>
        <div className="btn-group">
          <Button variant="outlined" color="secondary" size="large" href="https://github.com/johnkim0306/react-covid-tracker" className={classes.button} endIcon={<GitHubIcon />}>Github</Button>
          <Button variant="outlined" color="secondary" size="large" href="http://www.google.com" className={classes.button} endIcon={<LanguageRoundedIcon />}>Portfolio</Button>
          <Button variant="outlined" color="secondary" size="large" href="#contact" className={classes.button} endIcon={<SendIcon />}>Contact</Button>
        </div>
    </div>
  );
};

export default Sidebar;
