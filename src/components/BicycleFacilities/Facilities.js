import React, { useState } from "react";
import { connect } from "react-redux";

import {
  FloatingMenu,
  MainButton,
  ChildButton
} from "react-floating-button-menu";

import LayersIcon from "@material-ui/icons/Layers";
import CloseIcon from "@material-ui/icons/Close";
import LocalParkingIcon from "@material-ui/icons/LocalParking";

import pump from "../../images/air-pump.png";
import repair_center from "../../images/settings.png";
import rental from "../../images/bike_rent.png";

import { makeStyles } from "@material-ui/core/styles";

import {
  changeMode,
  displayAirpump,
  displayParking,
  displayRepair,
  displayRental
} from "../../redux/index";

const useStyles = makeStyles((theme) => ({
  position: {
    "& > *": {
      margin: theme.spacing(2)
    },
    position: "fixed",
    top: "140px",
    right: "1%",
    zIndex: "22"
  },
  button: {
    width: "15%",
    height: "15%"
  }
}));

const Facilities = (props) => {
  const classes = useStyles();

  const [isOpen, setOpen] = useState(false);

  const [airpump, setAirPump] = useState(false);
  const [park, setPark] = useState(false);
  const [repair, setRepair] = useState(false);
  const [rent, setRent] = useState(false);

  let pumpImg, parkImg, repairImg, rentImg;
  let pumpColor, parkColor, repairColor, rentColor, MainColor;
  if(airpump===false && park===false && repair===false && rent===false){
    MainColor = 'white'
  }else{
    MainColor = '#B0C4DE'
  }
  if (airpump === false) {
    pumpImg = <img src={pump} width="25" height="25" alt="airpump" />;
    pumpColor = 'white'
  } else {
    //pumpImg = <CloseIcon style={{ fontSize: 25, color: "black" }} />;
    pumpImg = <img src={pump} width="25" height="25" alt="airpump" />;
    pumpColor = '#B0C4DE'
  }
  if (park === false) {
    parkImg = <LocalParkingIcon style={{ fontSize: 25 }} />;
    parkColor = 'white'
  } else {
    //parkImg = <CloseIcon style={{ fontSize: 25, color: "black" }} />;
    parkImg = <LocalParkingIcon style={{ fontSize: 25 }} />;
    parkColor = '#B0C4DE'
  }
  if (repair === false) {
    repairImg = <img src={repair_center} width="25" height="25" alt="repair" />;
    repairColor = 'white'
  } else {
    repairImg = <img src={repair_center} width="25" height="25" alt="repair" />;
    repairColor = '#B0C4DE'
  }
  if (rent === false) {
    rentImg = <img src={rental} width="25" height="25" alt="rental" />;
    rentColor = 'white'
  } else {
    rentImg = <img src={rental} width="25" height="25" alt="rental" />;
    rentColor = '#B0C4DE'
  }

  return (
    <div className={classes.position}>
      <FloatingMenu
        slideSpeed={500}
        irection="down"
        spacing={8}
        isOpen={isOpen}
        className={classes.button}
      >
        <MainButton
          iconResting={<LayersIcon style={{ fontSize: 35, color: "black" }} />}
          iconActive={<LayersIcon style={{ fontSize: 35, color: "blue" }} />}
          //iconActive={<CloseIcon style={{ fontSize: 30, color: "black" }} />}
          background={MainColor}
          onClick={() => setOpen(!isOpen)}
          size={60}
        />
        <ChildButton
          icon={pumpImg}
          background={pumpColor}
          size={50}
          onClick={() => {
            props.displayAirpump();
            setAirPump(!airpump);
          }}
        />
        <ChildButton
          icon={parkImg}
          background={parkColor}
          size={50}
          onClick={() => {
            props.displayParking();
            setPark(!park);
          }}
        />
        <ChildButton
          icon={repairImg}
          background={repairColor}
          size={50}
          onClick={() => {
            props.displayRepair();
            setRepair(!repair);
          }}
        />
        <ChildButton
          icon={rentImg}
          background={rentColor}
          size={50}
          onClick={() => {
            props.displayRental();
            setRent(!rent);
          }}
        />
      </FloatingMenu>
    </div>
  );
};

//store에서 어떤 state값을 위의 BicycleLayer에 props 값으로 넣어줄지
const mapStateToProps = (state) => {
  return {

  };
};
//action을 dispatch하는 함수를 props로
const mapDispatchToProps = {
  displayAirpump: displayAirpump,
  displayParking: displayParking,
  displayRepair: displayRepair,
  displayRental: displayRental
};

export default connect(mapStateToProps, mapDispatchToProps)(Facilities);
