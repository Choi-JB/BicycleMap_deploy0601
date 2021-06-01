import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import CloseIcon from "@material-ui/icons/Close";

import { FloatingMenu, MainButton } from "react-floating-button-menu";

import { displayBicycleRoad } from "../../redux/index";

//material-ui 모듈을 설치해서 css처럼 쓰게해주는 함수
const useStyles = makeStyles((theme) => ({
  position: {
    "& > *": {
      margin: theme.spacing(2)
    },
    position: "fixed",
    top: "70px",
    right: "1%",
    zIndex: "11"
  },
  button: {
    width: "10%",
    height: "10%"
  }
}));

const BicycleLayer = (props) => {
  const classes = useStyles();

  const [selected, setSelected] = useState(false);

  return (
    <div className={classes.position}>
      <FloatingMenu spacing={8} isOpen={selected} className={classes.button}>
        <MainButton
          iconResting={
            <DirectionsBikeIcon style={{ fontSize: 35, color: "black" }} />
          }
          iconActive={<DirectionsBikeIcon style={{ fontSize: 35, color: "blue" }} />}
          background="white"
          onClick={() => {
            setSelected(!selected);
            props.displayBicycleRoad();
          }}
          size={60}
        />
      </FloatingMenu>
    </div>
  );
};

//store에서 어떤 state값을 위의 BicycleLayer에 props 값으로 넣어줄지
const mapStateToProps = (state) => {
  return {
    bicycle: state.facilities.bicycle
  };
};
//action을 dispatch하는 함수를 props로
const mapDispatchToProps = {
  displayBicycleRoad: displayBicycleRoad
};

export default connect(mapStateToProps, mapDispatchToProps)(BicycleLayer);
