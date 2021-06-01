import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { zoomMap } from "../../redux/index";

const useStyles = makeStyles((theme) => ({
  position: {
    "& > *": {
      margin: theme.spacing(1)
    },
    position: "fixed",
    top: "125px",
    left: "0",
    zIndex: "5"
  },
  button: {
    backgroundColor: "white",
    width: "45px",
    height: "45px"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Zoom = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.position}>
      <ButtonGroup orientation={"vertical"}>
        <Button
          className={classes.button}
          onClick={() => props.zoomMap(Number(-1))}
        >
          {" "}
          {/*확대 */}
          <AddIcon style={{ fontSize: 35, color: "gray" }} />
        </Button>
        <Button
          className={classes.button}
          onClick={() => props.zoomMap(Number(1))}
        >
          {" "}
          {/*축소 */}
          <RemoveIcon style={{ fontSize: 35, color: "gray" }} />
        </Button>
      </ButtonGroup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    level: state.mapControl.level
  };
};

const mapDispatchToProps = {
  zoomMap: zoomMap
};

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);
