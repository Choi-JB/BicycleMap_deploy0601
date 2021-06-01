import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";


import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { blue } from '@material-ui/core/colors';

//import { database } from "../../firebase/firebase";
//import axios from 'axios'
//import getCoordinates from '../../function/getCoordinates'

import {
  displayAir,
  setRadius,
  displayNewFacility,
  setLimitRadius
} from "../../redux/index";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  root: {
    width: 300,
  },

});



const Setting = (props) => {
  const classes = useStyles();
  const { onClose, open, airstate, radius, newFacility, limitRadius } = props;

  const [selectValue, setSelect] = useState({ 이름: '' });

  const valuetext=(value) => {
    props.setLimitRadius(value)
    return `${value}`;
  }

  const handleClose = () => {
    onClose(selectValue);
  };
  const displayAirState = (value) => {
    props.displayAir(!airstate)
    onClose(value);
  }
  const displayRadiusFacility = (value) => {
    props.setRadius(!radius)
    onClose(value);
  }
  const displayNewFacility = (value) => {
    props.displayNewFacility(!newFacility)
    onClose(value);
  }

  const handleListItemClick = (value) => {
    if (value.이름 === selectValue.이름) {
      setSelect({ 이름: '' })
    } else {
      setSelect(value)
    }
    onClose(value);
  };

  // useEffect(() => {
  //   database
  //     .collection("BicycleRoad")
  //     .get()
  //     .then(function (docs) {
  //       var list = []
  //       docs.forEach(function (doc) {
  //         list.push(doc.data())
  //       })
  //       setList(list)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(err);
  //     });

  // }, [open])


  // const ApiDefault = {
  //   url: "maps.googleapis.com/maps/api/geocode/json?address=",
  //   key: "AIzaSyDU1FjQuW-GwjIhVjMgSbdXl79hmbPOxtY"
  // };

  // useEffect(() => {
  //   if (selectValue.이름 === '') {
  //     return null
  //   } else {

  //     var path = selectValue.경로
  //     var coords = ''

  //     // for(let i=0; i< path.length; i++){
        
  //     //   await getCoordinates(path[i]).then(coord=>{
  //     //       coords = coords + coord
            
  //     //   })
        
  //     // }
  //     var index = 0
  //     path.forEach(async function(place){
  //       await getCoordinates(place).then(coord=>{
  //         //console.log(coord)
  //         if(coords !== ''){
  //           coords = coords +';' +coord
  //         }else{
  //           coords = coord
  //         }
  //         index++
  //         if(index == path.length){
  //           setCoord(coords)
  //         }
  //       })
  //     })

  //   }
    
  // }, [selectValue])

  // useEffect(() => {
  //   console.log(coordinates)
  // }, [coordinates])

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">설정</DialogTitle>
      <List>
        <ListItem button onClick={() => displayAirState()} key={'air'}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
            {airstate ? (
                  <CheckBoxIcon />
            ) : (
                  <CheckBoxOutlineBlankIcon />
             )}
            </Avatar>
          </ListItemAvatar>

          <ListItemText primary={'대구 미세먼지 정보 표시'} />
        </ListItem>

              <Tooltip title="체크 해제시 기기에 따라 성능이 저하될 수 있습니다">
        <ListItem button onClick={() => displayRadiusFacility()} key={'radius'}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
            {radius ? (
                  <CheckBoxIcon />
            ) : (
                  <CheckBoxOutlineBlankIcon />
             )}
            </Avatar>
          </ListItemAvatar>

          <ListItemText primary={'일정거리 내 시설만 표시'} />
        </ListItem>
        </Tooltip>
        <ListItem>
        <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        반경 설정 {limitRadius}(m) 
      </Typography>
      <Slider
        defaultValue={limitRadius}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={1000}
        max={5000}
      />
    </div>
    </ListItem>
        <ListItem button onClick={() => displayNewFacility()} key={'new'}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
            {newFacility ? (
                  <CheckBoxIcon />
            ) : (
                  <CheckBoxOutlineBlankIcon />
             )}
            </Avatar>
          </ListItemAvatar>

          <ListItemText primary={'신규 신고된 시설 표시'} />
        </ListItem>
        {/* <DialogTitle id="simple-dialog-title">추천 자전거길 표시</DialogTitle>
        {RoadList.map((list) => (
          <ListItem button onClick={() => handleListItemClick(list)} key={list.이름}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {selectValue.이름 === list.이름 ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={list.이름} />
          </ListItem>
        ))} */}

      </List>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    airstate: state.facilities.airstate,
    radius: state.mapControl.radius,
    newFacility: state.mapControl.newFacility,
    limitRadius: state.mapControl.limitRadius
  };
};

const mapDispatchToProps = {
  displayAir:displayAir,
  setRadius:setRadius,
  displayNewFacility:displayNewFacility,
  setLimitRadius: setLimitRadius

};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);