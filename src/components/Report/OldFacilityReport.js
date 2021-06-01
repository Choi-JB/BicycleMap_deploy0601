import React, {useEffect} from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { displayOldReport, displayInfo, alertMessage } from "../../redux/index";
import { database } from "../../firebase/firebase";

//import { ip } from "../../redux/ip";
//import axios from "axios";

import getTimestamp from "../../function/getTimestamp";
//import moment from "moment";
//const time = moment().format("YYYY-MM-DD hh:mm:ss");

const OldFacilityReport = (props) => {
  const { oldFacilityReport, selectedMarker } = props;

  const [value, setValue] = React.useState("female");
  const [etc, setEtc] = React.useState("");
  const [radioState, setRadioState] = React.useState([
    {
      고장: true,
      기타: true
    }
  ]);
  useEffect(() => {
    setValue('')
    setEtc('')
    setRadioState({
      고장: true,
      기타: true
    })
  }, [oldFacilityReport])

  const handleClose = () => {
    props.displayOldReport(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "고장") {
      setRadioState({
        고장: false,
        기타: true
      });
    } else if (event.target.value === "기타") {
      setRadioState({
        고장: true,
        기타: false
      });
    } else {
      setEtc(" ");
      setRadioState({
        고장: true,
        기타: true
      });
    }
  };
  const handleEtcChange = (event) => {
    setEtc(event.target.value);
  };

  const submitReport = () => {
    switch (selectedMarker.type) {
      case "road":
        break;
      case "airpump":
        {
          let airpumpUploadReport = {
            신고날짜: getTimestamp(),
            시설종류: selectedMarker.type,
            번호: selectedMarker.번호,
            주소: selectedMarker.위치,
            위도: selectedMarker.위도,
            경도: selectedMarker.경도,
            상태: value,
            비고: etc
          };
          let airpumpUploadReportLog = {
            신고날짜: getTimestamp(),
            주소: selectedMarker.위치,
            상태: value,
            비고: etc
          };
          database
            .collection("OldFacility")
            .doc(`${airpumpUploadReport.위도}`)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                database
                  //현상태기록
                  .collection("OldFacility")
                  .doc(`${airpumpUploadReport.위도}`)
                  .update(Object.assign({}, airpumpUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  //로그 기록 (해당정보만 입력)
                  .collection("OldFacility")
                  .doc(`${airpumpUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${airpumpUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, airpumpUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              } else {
                database
                  .collection("OldFacility")
                  .doc(`${airpumpUploadReport.위도}`)
                  .set(Object.assign({}, airpumpUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  .collection("OldFacility")
                  .doc(`${airpumpUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${airpumpUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, airpumpUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              }
              //alert("신고 완료!");
              props.alertMessage("신고완료", "success");
            });
        }
        break;
      case "park":
        {
          let parkingUploadReport = {
            신고날짜: getTimestamp(),
            시설종류: selectedMarker.type,
            번호: selectedMarker.번호,
            주소: selectedMarker.위치,
            위도: selectedMarker.위도,
            경도: selectedMarker.경도,
            상태: value,
            비고: etc
          };
          let parkingUploadReportLog = {
            신고날짜: getTimestamp(),
            주소: selectedMarker.위치,
            상태: value,
            비고: etc
          };
          database
            .collection("OldFacility")
            .doc(`${parkingUploadReport.위도}`)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                database
                  .collection("OldFacility")
                  .doc(`${parkingUploadReport.위도}`)
                  .update(Object.assign({}, parkingUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  .collection("OldFacility")
                  .doc(`${parkingUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${parkingUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, parkingUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              } else {
                database
                  .collection("OldFacility")
                  .doc(`${parkingUploadReport.위도}`)
                  .set(Object.assign({}, parkingUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  .collection("OldFacility")
                  .doc(`${parkingUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${parkingUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, parkingUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              }
              //alert("신고 완료!");
              props.alertMessage("신고완료", "success");
            });
        }
        break;
      case "repair":
        {
          let repairUploadReport = {
            신고날짜: getTimestamp(),
            시설종류: selectedMarker.type,
            번호: selectedMarker.번호,
            주소: selectedMarker.위치,
            위도: selectedMarker.위도,
            경도: selectedMarker.경도,
            상태: value,
            비고: etc
          };
          let repairUploadReportLog = {
            신고날짜: getTimestamp(),
            주소: selectedMarker.위치,
            상태: value,
            비고: etc
          };
          database
            .collection("OldFacility")
            .doc(`${repairUploadReport.위도}`)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                database
                  .collection("OldFacility")
                  .doc(`${repairUploadReport.위도}`)
                  .update(Object.assign({}, repairUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  .collection("OldFacility")
                  .doc(`${repairUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${repairUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, repairUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              } else {
                database
                  .collection("OldFacility")
                  .doc(`${repairUploadReport.위도}`)
                  .set(Object.assign({}, repairUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  .collection("OldFacility")
                  .doc(`${repairUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${repairUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, repairUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              }
              //alert("신고 완료!");
              props.alertMessage("신고완료", "success");
            });
        }
        break;
      case "rental":
        {
          let rentalUploadReport = {
            신고날짜: getTimestamp(),
            시설종류: selectedMarker.type,
            번호: selectedMarker.번호,
            주소: selectedMarker.위치,
            위도: selectedMarker.위도,
            경도: selectedMarker.경도,
            상태: value,
            비고: etc
          };
          let rentalUploadReportLog = {
            신고날짜: getTimestamp(),
            주소: selectedMarker.위치,
            상태: value,
            비고: etc
          };
          database
            .collection("OldFacility")
            .doc(`${rentalUploadReport.위도}`)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                database
                  .collection("OldFacility")
                  .doc(`${rentalUploadReport.위도}`)
                  .update(Object.assign({}, rentalUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  .collection("OldFacility")
                  .doc(`${rentalUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${rentalUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, rentalUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              } else {
                database
                  .collection("OldFacility")
                  .doc(`${rentalUploadReport.위도}`)
                  .set(Object.assign({}, rentalUploadReport))
                  .then((res) => {
                    console.log(res);
                  });
                database
                  .collection("OldFacility")
                  .doc(`${rentalUploadReport.위도}`)
                  .collection("ReportLog")
                  .doc(`${rentalUploadReportLog.신고날짜}`)
                  .set(Object.assign({}, rentalUploadReportLog))
                  .then((res) => {
                    console.log(res);
                  });
              }
              //alert("신고 완료!");
              props.alertMessage("신고완료", "success");
            });
        }
        break;
      default:
        props.displayOldReport(false);
    }

    //======= backend 로 전송==========
    // axios.post(ip + '/report/old', {message:'test'})
    //   .then(() => {
    //       alert('신고 완료')
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //     alert(err)
    // })
    props.displayOldReport(false);

    props.displayInfo(false);
    setTimeout(() => {
      props.displayInfo(true);
    }, 500);
  };

  return (
    <div>
      <Dialog
        open={oldFacilityReport}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">시설 신고</DialogTitle>
        <DialogContent>
          <DialogContentText>신고할 항목을 선택하세요</DialogContentText>
          <FormControl component="fieldset">
            <FormLabel component="legend">항목</FormLabel>
            <RadioGroup
              aria-label="list"
              name="list1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="고장" control={<Radio />} label="고장" />
              <TextField
                autoFocus
                margin="dense"
                id="비고"
                name="고장비고"
                label="상세 내역을 입력하세요"
                type="text"
                disabled={radioState.고장}
                fullWidth
                onChange={handleEtcChange}
              />
              <FormControlLabel value="철거" control={<Radio />} label="철거" />

              <FormControlLabel
                value="수리완료"
                control={<Radio />}
                label="수리완료"
              />
              <FormControlLabel value="기타" control={<Radio />} label="기타" />
              <TextField
                autoFocus
                margin="dense"
                id="비고"
                name="기타비고"
                label="상세 내역을 입력하세요"
                type="text"
                disabled={radioState.기타}
                fullWidth
                onChange={handleEtcChange}
              />
            </RadioGroup>
          </FormControl>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={submitReport} color="primary">
            신고하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    oldFacilityReport: state.report.oldFacilityReport,

    selectedMarker: state.facilities.selectedMarker
  };
};

const mapDispatchToProps = {
  displayOldReport: displayOldReport,
  displayInfo: displayInfo,
  alertMessage: alertMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(OldFacilityReport);
