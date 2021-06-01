import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Setting from './Setting'

import axios from "axios";

import { findPlace } from "../../redux/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

const SearchPlace = (props) => {
  const classes = useStyles();

  const [inputText, setInputText] = useState(""); //검색창 값
  const [place, setPlace] = useState(""); //검색한 주소

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    //setInputText("");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const ApiDefault = {
    url: "maps.googleapis.com/maps/api/geocode/json?address=",
    key: "AIzaSyDU1FjQuW-GwjIhVjMgSbdXl79hmbPOxtY"
  };
  //https://maps.googleapis.com/maps/api/geocode/json?address=동대구역&key=AIzaSyDU1FjQuW-GwjIhVjMgSbdXl79hmbPOxtY

  //구글 geocoding API를 통해 주소를 좌표로 변환
  const getCoordinates = async () => {
    let reqURL = `https://${ApiDefault.url}${place}&key=${ApiDefault.key}`;

    axios
      .get(reqURL)
      .then(({ data }) => {
        //api 호출 결과로 json 데이터가 반환됨
        var result = {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          address: place
        };

        props.findPlace(result); //좌표부분만 골라서 전달
        //console.log(data.results[0].geometry.location);
        setPlace("");
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e); // 에러표시
      });
  };

  useEffect(() => {
    getCoordinates();
  }, [place]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClickOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            자전거 편의시설 로드맵
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form className="inputForm" onSubmit={handleSubmit}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={onChange}
                value={inputText}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <Setting open={open} onClose={handleClose} />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlace);
