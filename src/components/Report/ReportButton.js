import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AddLocationIcon from "@material-ui/icons/AddLocation";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { makeStyles } from "@material-ui/core/styles";

import { setReportMode } from "../../redux/index";

const useStyles = makeStyles((theme) => ({
  position: {
    "& > *": {
      margin: theme.spacing(1)
    },
    position: "fixed",
    top: "225px",
    left: "0",
    zIndex: "44"
  },
  button: {
    backgroundColor: "white",
    width: "45px",
    height: "45px"
  }
}));

const CurrentPosition = (props) => {
  const classes = useStyles();

  const {reportMode} = props;

  const [isClick, setClick] = useState(true);
  const [view, setView] = useState("list");
  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  const handlerClick = () => {
    props.setReportMode();
  };
  useEffect(()=>{
    setClick(!isClick)
  },[reportMode])

  return (
    <div className={classes.position}>
      <ButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        <Button
          value="gps"
          aria-label="gps"
          className={classes.button}
          onClick={handlerClick}
        > 
          {isClick? (
            <AddLocationIcon style={{ fontSize: 35, color: "blue" }} />
          ):(
            <AddLocationIcon style={{ fontSize: 35, color: "gray" }} />
          )}

        </Button>
      </ButtonGroup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reportMode:state.report.reportMode
  };
};

const mapDispatchToProps = {
  setReportMode: setReportMode
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPosition);
