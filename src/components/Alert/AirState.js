import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useInterval } from 'react-use';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  
} from "../../redux/index";

import { ip } from "../../redux/ip";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow:'hidden',
    
    fontSize:'16px',
    textAlign:'center',
    margin:'8px 0 0 0',
    padding:'0px 14px 0 14px',

    borderTopLeftRadius:'13px',
    borderTopRightRadius:'13px',
    borderBottomLeftRadius:'13px',
    borderBottomRightRadius:'13px',

    position: "absolute",
    left:'25%',
    top: "10%",
    zIndex: "8888",
  },

  state: {
    fontWeight: "bold"
  },

}));

const AirState = (props) => {
  const classes = useStyles();

  const {airstate} = props;
  const [pm10, setPM10] = useState({value:0, state:'loading...', color:'black'}) //미세먼지
  const [pm25, setPM25] = useState({value:0, state:'loading...', color:'black'}) //초미세먼지
  const [reqDate,setReqDate] = useState('')
  const [showPM, setPM] = useState(true)

  useInterval(()=>{
    setPM(!showPM)
  },5000)

  const getAirState = () =>{
    axios
      .get(ip + "/air", { params: { message: "request air state data" } })
      .then((res) => {
          //console.log(res.data)
          var pm10value = res.data.미세먼지
          var pm25value = res.data.초미세먼지

          if(pm10value<=30){
            setPM10({value:pm10value, state:'좋음', color:'blue'})
          }else if(pm10value<=80){
            setPM10({value:pm10value, state:'보통', color:'green'})
          }else if(pm10value<=150){
            setPM10({value:pm10value, state:'나쁨', color:'orange'})
          }else{
            setPM10({value:pm10value, state:'매우', color:'red'})
          }

          if(pm25value<=15){
            setPM25({value:pm25value, state:'좋음', color:'blue'})
          }else if(pm25value<=35){
            setPM25({value:pm25value, state:'보통', color:'green'})
          }else if(pm25value<=75){
            setPM25({value:pm25value, state:'나쁨', color:'orange'})
          }else{
            setPM25({value:pm25value, state:'매우', color:'red'})
          }

          setReqDate(res.data.관측날짜)
      })
  }

  useEffect(() => {
    getAirState()
  }, []);

  useEffect(() => {
    getAirState()
  }, [airstate]);
  
  const renderAirState=()=>{
    if(airstate){
      if(showPM){
        return(
          <div className={classes.root} style={{ backgroundColor: `${pm10.color}`, color: 'white' }}>
          미세먼지 : &nbsp;
          <span className={classes.state} style={{ color: 'white' }}>
            {pm10.state}({pm10.value})
          </span>
          </div>
        )
      }else{
        return(
          <div className={classes.root} style={{ backgroundColor: `${pm25.color}`, color: 'white' }}>
          초미세먼지 : &nbsp;
          <span className={classes.state} style={{ color: 'white' }}>
            {pm25.state}({pm25.value})
          </span>
          </div>
          )
      }
    }else{
      return(
          <div>
          </div>
        )
    }
    
  }

  return (
    <div  >
       {renderAirState()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    airstate: state.facilities.airstate,
  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(AirState);
