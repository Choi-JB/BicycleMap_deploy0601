import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";

import FindRoad from "@material-ui/icons/Directions";
import Report from "@material-ui/icons/Report";
import ReportDetail from "@material-ui/icons/List";

import {
  displayOldReport,
  displayInfo,
  displayReportDetail
} from "../../redux/index";

import { database } from "../../firebase/firebase";

//css
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "",
    position: "fixed",
    left: "0px",
    bottom: "0px",
    zIndex: "5"
  },
  container: {
    /* display: 'flex', */
  },
  paper: {
    //display : "inline-block"
  },
  title: {
    fontSize: 22,
    padding: "0.1rem"
  },
  other: {
    fontSize: 15,
    margintop: "10px",
    display: "inline-block"
  },
  btn: {
    display: "inline-block",
    float: "right"
  },
  state: {
    color: "red",
    fontWeight: "bold"
  }
}));

const Info = (props) => {
  const classes = useStyles();

  //store에서 가져온 state값
  const { info, selectedMarker } = props;

  const [state, setState] = useState("loading...");

  //길찾기 연결
  const findRoad = function () {
    var link = `https://map.kakao.com/link/to/${selectedMarker.위치},${selectedMarker.위도},${selectedMarker.경도}`;
    window.open(link);
  };
  //신고창 열기
  const openReport = function () {
    props.displayOldReport(true);
  };
  //신고내역 열기
  const openReportDetail = function () {
    props.displayReportDetail(true);
  };
  //시설 상태 표시
  const showFacilityState = function () {
    database
      .collection("OldFacility")
      .doc(`${selectedMarker.위도}`)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var state = doc.data().상태;
          switch (state) {
            case "고장":
              setState("[고장]");
              break;
            case "철거":
              setState("[철거됨]");
              break;
            case "수리완료":
              setState("");
              break;
            default:
              setState("");
          }
        } else {
          setState("");
        }
      });
  };
  useEffect(() => {
    showFacilityState();
  }, [info, selectedMarker]);

  //인포창 렌더링
  const showInfo = function () {
    switch (selectedMarker.type) {
      case "airpump":
        return (
          //선택한 마커가 공기주입기
          <>
            <div className={classes.title}>
              자전거 공기주입기
              <span className={classes.state}> {state}</span>
            </div>
            <div className={classes.other}>
              {selectedMarker.위치}
              <br />
              타입: {selectedMarker.타입}
              <br />
              문의: {selectedMarker.관리기관} | {selectedMarker.전화번호}
            </div>
          </>
        );
      case "park":
        return (
          //선택한 마커가 주차장
          <>
            <div className={classes.title}>
              자전거 보관소
              <span className={classes.state}> {state}</span>
            </div>
            <div className={classes.other}>
              {selectedMarker.위치}
              <br />
              문의: {selectedMarker.관리기관} | {selectedMarker.전화번호}
            </div>
          </>
        );
      case "rental":
        return (
          //선택한 마커가 대여소
          <>
            <div className={classes.title}>
              자전거 대여소
              <span className={classes.state}> {state}</span>
            </div>
            <div className={classes.other}>
              {selectedMarker.위치}
              <br />
              대여시간: {selectedMarker.대여시간} | 반납시간:{" "}
              {selectedMarker.반납시간}
            </div>
          </>
        );
      case "repair":
        return (
          //선택한 마커가 수리센터
          <>
            <div className={classes.title}>
              자전거 수리센터
              <span className={classes.state}> {state}</span>
            </div>
            <div className={classes.other}>
              {selectedMarker.위치}
              <br />
              운영기간: {selectedMarker.운영기간} | 운영시간:{" "}
              {selectedMarker.운영시간}
              <br />
              운영일: {selectedMarker.운영일}
              <br />
              문의: {selectedMarker.관리기관} | {selectedMarker.전화번호}
            </div>
          </>
        );

      default:
        return (
          <>
            <div className={classes.title}>불러오는 중... </div>
          </>
        );
    }
  };
  const Rendering = () => {
    const { value, setValue } = useState("");
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    if (info) {
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
              {showInfo()}

              <BottomNavigation showLabels className={classes.paper}>
                <BottomNavigationAction
                  label="신고하기"
                  icon={<Report style={{ color: "red" }} />}
                  onClick={openReport}
                />
                <BottomNavigationAction
                  label="신고내역"
                  icon={<ReportDetail />}
                  onClick={openReportDetail}
                />
                <BottomNavigationAction
                  label="길찾기"
                  icon={<FindRoad style={{ color: "blue" }} />}
                  onClick={findRoad}
                />
              </BottomNavigation>
            </Paper>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return <>{Rendering()}</>;
};

const mapStateToProps = (state) => {
  return {
    info: state.facilities.info,
    selectedMarker: state.facilities.selectedMarker
  };
};

const mapDispatchToProps = {
  displayOldReport: displayOldReport,
  displayInfo: displayInfo,
  displayReportDetail: displayReportDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
