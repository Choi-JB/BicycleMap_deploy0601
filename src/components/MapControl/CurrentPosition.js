import React, { useState } from "react";
import { connect } from "react-redux";

import GpsFixedIcon from "@material-ui/icons/GpsFixed";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { makeStyles } from "@material-ui/core/styles";

import { findPlace } from "../../redux/index";

const useStyles = makeStyles((theme) => ({
  position: {
    "& > *": {
      margin: theme.spacing(1)
    },
    position: "fixed",
    top: "70px",
    left: "0",
    zIndex: "2"
  },
  button: {
    backgroundColor: "white",
    width: "45px",
    height: "45px"
  }
}));

const CurrentPosition = (props) => {
  const classes = useStyles();

  const [view, setView] = useState("list");
  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  //geolocation API : 현재위치 찾기
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("브라우저의 권한 요청을 허가해 주세요!");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var coordinate = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "현재위치"
          };
          props.findPlace(coordinate);
        },
        () => {
          alert("현재 장소를 찾을 수 없습니다!");
        }
      );
    }
  };

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
          onClick={getLocation}
        >
          <GpsFixedIcon style={{ fontSize: 35, color: "gray" }} />
        </Button>
      </ButtonGroup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    place: state.mapControl.place
  };
};

const mapDispatchToProps = {
  findPlace: findPlace
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPosition);
