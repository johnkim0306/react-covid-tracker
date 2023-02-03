import React from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { makeStyles } from "@material-ui/core/styles";
import './Sidebar.scss';

const useStyles = makeStyles(theme => ({
  button: {
    height: theme.spacing(7),
    variant: 'outlined',
    color: 'secondary',
    width: '100%'
}}));


const Sidebar = ({activateCanada, activateWorldWide }) => {
  const classes = useStyles();

  return (
    <div className="sidebar">
        <div className="sidebar__title">
          <h1 className="sidebar__title--text"> CORONA LIVE </h1>
        </div>
        <div className="btn-group">
          <Button variant="outlined" color="secondary" size="large" onClick={activateCanada}>Canada </Button>
          <Button variant="outlined" color="secondary" size="large" onClick={activateWorldWide}>Worldwide</Button>
        </div>
        <div className="btn-group">
          <Button variant="outlined" color="secondary" size="large" href="https://github.com/johnkim0306/react-covid-tracker" className={classes.button}><GitHubIcon />Github</Button>
          <Button variant="outlined" color="secondary" size="large" href="http://www.google.com" className={classes.button}><LanguageRoundedIcon />Portfolio</Button>
        </div>
        <a href="#contact">
          <Button variant="outlined" color="secondary" size="large" className={classes.button} endIcon={<SendIcon />}>Contact</Button>
        </a>
    </div>
  );
};

export default Sidebar;
