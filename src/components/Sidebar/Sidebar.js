import React from "react";
import Button from '@mui/material/Button';
import {Card, CardContent} from "@material-ui/core";
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


const Sidebar = (props) => {
  const classes = useStyles();

  return (
    <div className="sidebar">
    <div className="sidebar__title">
      <h1 className="sidebar__title--text"> CORONA LIVE </h1>
    </div>

    <section>
      <div className="btn-group">
        <Button variant="outlined" color="secondary" size="large" onClick={props.activateCanada}>Canada </Button>
        <Button variant="outlined" color="secondary" size="large" onClick={props.activateWorldWide}>Worldwide</Button>
      </div>
    </section>

    <section>
      <div className="btn-group">
        <Button variant="outlined" color="secondary" size="large" href="http://www.google.com" className={classes.button}><GitHubIcon />Github</Button>
        <Button variant="outlined" color="secondary" size="large" href="http://www.google.com" className={classes.button}><LanguageRoundedIcon />Portfolio</Button>
      </div>
    </section>

    <Button variant="outlined" color="secondary" size="large" onClick={props.activateCases}>Cases</Button>
    <Button variant="outlined" color="secondary" size="large" onClick={props.activateCountryInfo}>Death</Button>

    <a href="#contact">
      <Button variant="outlined" color="secondary" size="large" className={classes.button} endIcon={<SendIcon />}>Contact</Button>
    </a>
  </div>
  );
};

export default Sidebar;
