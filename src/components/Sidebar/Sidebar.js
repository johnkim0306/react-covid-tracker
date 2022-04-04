import React from "react";
import Button from '@mui/material/Button';
import {Card, CardContent} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
    <div className="sidebar__title">
      <h1 className="sidebar__title--text"> CORONA LIVE </h1>
    </div>

    <section>
      <div className="btn-group">
        <Button variant="outlined" color="secondary" size="large" onClick={props.activateCanada}>Canada</Button>
        <Button variant="outlined" color="secondary" size="large" onClick={props.activateWorldWide}>Worldwide</Button>
      </div>
    </section>

    <Button variant="outlined" color="secondary" size="large" onClick={props.activateCases}>Cases</Button>
    <Button variant="outlined" color="secondary" size="large" onClick={props.activateCountryInfo}>Death</Button>

    <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
    <Card>
      <CardContent>
        <div className="app__information">
          <h3>money</h3>
        </div>
      </CardContent>            
    </Card>
  </div>
  );
};

export default Sidebar;
