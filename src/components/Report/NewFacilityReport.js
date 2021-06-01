import React, {useEffect} from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { displayNewReport, alertMessage, displayNewFacility, setReportMode } from "../../redux/index";

import { database } from "../../firebase/firebase";

import getTimestamp from "../../function/getTimestamp";
//import moment from "moment";
//const time = moment().format("YYYY-MM-DD hh:mm:ss");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  rowComponent: {
    display: "flex",
    flexDirection: "row"
  }
}));

const NewFacilityReport = (props) => {
  

  const operationTime = [
    "00시",
    "01시",
    "02시",
    "03시",
    "04시",
    "05시",
    "06시",
    "07시",
    "08시",
    "09시",
    "10시",
    "11시",
    "12시",
    "13시",
    "14시",
    "15시",
    "16시",
    "17시",
    "18시",
    "19시",
    "20시",
    "21시",
    "22시",
    "23시"
  ];
  const operationDay = ["월", "화", "수", "목", "금", "토", "일"];
  const operationMonth = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
  ];
  const classes = useStyles();
  const [facility, setFacility] = React.useState("");
  const [type, setType] = React.useState("수동식");
  const [inquiries, setInquiries] = React.useState("북구청 교통과");
  const [management, setManagement] = React.useState("대구광역시 북구청");
  const [returnTime, setReturnTime] = React.useState("");
  const [count, setCount] = React.useState(6);
  const [opTime1, setOpTime1] = React.useState(0);
  const [opTime2, setOpTime2] = React.useState(0);
  const [rtTime1, setRtTime1] = React.useState(0);
  const [rtTime2, setRtTime2] = React.useState(0);
  var [opDayString, setOpDayString] = React.useState(" ");
  var [opMonthString, setOpMonthString] = React.useState(" ");
  const [opDay, setOpDay] = React.useState(new Set());
  const [opMonth, setOpMonth] = React.useState(new Set());
  const [opDayIsChecked, setOpdayIsChecked] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [opMonthIsChecked, setOpMonthIsChecked] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [airpumpInfo, setAirpumpInfo] = React.useState([
    {
      상세주소: "",
      전화번호: 0
    }
  ]);
  const [repairInfo, setRepairInfo] = React.useState([
    {
      상세주소: "",
      전화번호: 0
    }
  ]);
  const [rentalInfo, setRentalInfo] = React.useState([
    {
      상세주소: ""
    }
  ]);
  const [parkInfo, setParkInfo] = React.useState([
    {
      상세주소: "",
      전화번호: 0
    }
  ]);

  const { newFacilityReport, reportlatlng, reportAddress, newFacility } = props;

  useEffect(() => {
    setFacility('')
  }, [newFacilityReport])
  
  const handleOpDayChange = (event) => {
    if (event.target.checked) {
      opDay.add(event.target.value);
      setOpDay(opDay);
      setOpdayIsChecked(event.target.checked);
    } else if (!event.target.checked) {
      opDay.delete(event.target.value);
      setOpDay(opDay);
      setOpdayIsChecked(event.target.checked);
    }
  };
  const handleOpMonthChange = (event) => {
    if (event.target.checked) {
      opMonth.add(event.target.value);
      setOpMonth(opMonth);
      setOpMonthIsChecked(event.target.checked);
    } else if (!event.target.checked) {
      opMonth.delete(event.target.value);
      setOpMonth(opMonth);
      console.log(opMonth);
      setOpMonthIsChecked(event.target.checked);
    }
  };
  const handleChange = (event) => {
    setFacility(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleInquiriesChange = (event) => {
    setInquiries(event.target.value);
  };
  const handleManagementChange = (event) => {
    setManagement(event.target.value);
  };
  const handleReturnTimeChange = (event) => {
    setReturnTime(event.target.value);
  };
  const handleClose = () => {
    props.displayNewReport(false);
  };
  const handleOpTime1Change = (event) => {
    setOpTime1(event.target.value);
  };
  const handleOpTime2Change = (event) => {
    setOpTime2(event.target.value);
  };
  const handleRtTime1Change = (event) => {
    setRtTime1(event.target.value);
  };
  const handleRtTime2Change = (event) => {
    setRtTime2(event.target.value);
  };
  const handleAirpumpInfoChange = (event) => {
    setAirpumpInfo({
      ...airpumpInfo,
      [event.target.id]: event.target.value
    });
  };
  const handleRepairInfoChange = (event) => {
    setRepairInfo({
      ...repairInfo,
      [event.target.id]: event.target.value
    });
  };
  const handleRentalInfoChange = (event) => {
    setRentalInfo({
      ...rentalInfo,
      [event.target.id]: event.target.value
    });
  };
  const handleParkInfoChange = (event) => {
    setParkInfo({
      ...parkInfo,
      [event.target.id]: event.target.value
    });
  };

  //다른 입력창 출력
  const showInputForm = function () {
    switch (facility) {
      case "공기주입기":
        return (
          //공기주입기 선택
          <>
            <div>
              <InputLabel>주소 : {reportAddress}</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="상세주소"
                label="상세주소(예-1가 공평로 88)"
                type="text"
                fullWidth
                onChange={handleAirpumpInfoChange}
              />
              <br></br>
              <br></br>
              <div className={classes.rowComponent}>
                <InputLabel>타입</InputLabel>
                <Select id="타입" value={type} onChange={handleTypeChange}>
                  <MenuItem value="태양광">태양광</MenuItem>
                  <MenuItem value="수동식">수동식</MenuItem>
                </Select>
              </div>
              <br></br>
              <div className={classes.rowComponent}>
                <InputLabel>관리기관</InputLabel>
                <Select
                  id="관리기관"
                  value={management}
                  onChange={handleManagementChange}
                >
                  <MenuItem value="대구광역시 북구청">
                    대구광역시 북구청
                  </MenuItem>
                  <MenuItem value="대구광역시 남구청">
                    대구광역시 남구청
                  </MenuItem>
                  <MenuItem value="대구광역시 동구청">
                    대구광역시 동구청
                  </MenuItem>
                  <MenuItem value="대구광역시 서구청">
                    대구광역시 서구청
                  </MenuItem>
                  <MenuItem value="대구광역시 중구청">
                    대구광역시 중구청
                  </MenuItem>
                  <MenuItem value="대구광역시 달서구청">
                    대구광역시 달서구청
                  </MenuItem>
                  <MenuItem value="대구광역시 달성군청">
                    대구광역시 달성군청
                  </MenuItem>
                  <MenuItem value="대구광역시 수성구청">
                    대구광역시 수성구청
                  </MenuItem>
                </Select>
              </div>
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="전화번호"
                label="전화번호(예-0531234567)"
                type="number"
                pattern="0\d{1,2}\-\d{3,4}\-\d{4}"
                fullWidth
                onChange={handleAirpumpInfoChange}
              />
            </div>
          </>
        );
      case "보관소":
        return (
          //보관소 선택
          <>
            <div>
              <InputLabel>주소 : {reportAddress}</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="상세주소"
                label="상세주소(예-1가 공평로 88)"
                type="text"
                fullWidth
                onChange={handleParkInfoChange}
              />
              <br></br>
              <br></br>
              <div className={classes.rowComponent}>
                <InputLabel>관리기관</InputLabel>
                <Select
                  id="관리기관"
                  value={management}
                  onChange={handleManagementChange}
                >
                  <MenuItem value="대구광역시 북구청">
                    대구광역시 북구청
                  </MenuItem>
                  <MenuItem value="대구광역시 남구청">
                    대구광역시 남구청
                  </MenuItem>
                  <MenuItem value="대구광역시 동구청">
                    대구광역시 동구청
                  </MenuItem>
                  <MenuItem value="대구광역시 서구청">
                    대구광역시 서구청
                  </MenuItem>
                  <MenuItem value="대구광역시 중구청">
                    대구광역시 중구청
                  </MenuItem>
                  <MenuItem value="대구광역시 달서구청">
                    대구광역시 달서구청
                  </MenuItem>
                  <MenuItem value="대구광역시 달성군청">
                    대구광역시 달성군청
                  </MenuItem>
                  <MenuItem value="대구광역시 수성구청">
                    대구광역시 수성구청
                  </MenuItem>
                </Select>
              </div>
              <TextField
                autoFocus
                margin="dense"
                id="전화번호"
                label="전화번호(예-0531234567)"
                type="number"
                pattern="0\d{1,2}\-\d{3,4}\-\d{4}"
                fullWidth
                onChange={handleParkInfoChange}
              />
            </div>
          </>
        );
      case "수리센터":
        return (
          //수리센터 선택
          <>
            <div>
              <InputLabel>주소 : {reportAddress}</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="상세주소"
                label="상세주소(예-1가 공평로 88)"
                type="text"
                fullWidth
                onChange={handleRepairInfoChange}
              />
              <br></br>
              <br></br>
              <InputLabel>운영기간(월)</InputLabel>
              <br></br>
              <div className={classes.rowComponent}>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[0]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[0]}
                />
                <InputLabel>{operationMonth[0] + " "}</InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[1]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[1]}
                />
                <InputLabel>{operationMonth[1]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[2]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[2]}
                />
                <InputLabel>{operationMonth[2]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[3]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[3]}
                />
                <InputLabel>{operationMonth[3]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[4]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[4]}
                />
                <InputLabel>{operationMonth[4]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[5]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[5]}
                />
                <InputLabel>{operationMonth[5]}</InputLabel>
              </div>
              <div className={classes.rowComponent}>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[6]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[6]}
                />
                <InputLabel>{operationMonth[6]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[7]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[7]}
                />
                <InputLabel>{operationMonth[7]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[8]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[8]}
                />
                <InputLabel>{operationMonth[8]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[9]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[9]}
                />
                <InputLabel>{operationMonth[9]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[10]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[10]}
                />
                <InputLabel>{operationMonth[10]} </InputLabel>
                <input
                  type="checkbox"
                  style={{
                    width: 20,
                    height: 20
                  }}
                  checked={opMonthIsChecked[11]}
                  onChange={handleOpMonthChange}
                  id="운영기간"
                  value={operationMonth[11]}
                />
                <InputLabel>{operationMonth[11]}</InputLabel>
              </div>
              <br></br>
              <div className={classes.rowComponent}>
                <InputLabel>운영시간</InputLabel>
                <Select
                  id="운영시간1"
                  value={opTime1}
                  onChange={handleOpTime1Change}
                >
                  {operationTime.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel> ~ </InputLabel>
                <Select
                  id="운영시간2"
                  value={opTime2}
                  onChange={handleOpTime2Change}
                >
                  {operationTime.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <br></br>
              <InputLabel>운영일</InputLabel>
              <br></br>
              <div className={classes.rowComponent}>
                <input
                  type="checkbox"
                  checked={opDayIsChecked[0]}
                  onChange={handleOpDayChange}
                  id="운영일"
                  name="0"
                  value={operationDay[0]}
                />
                <InputLabel>{operationDay[0]}</InputLabel>
                <input
                  type="checkbox"
                  checked={opDayIsChecked[1]}
                  onChange={handleOpDayChange}
                  id="운영일"
                  name="1"
                  value={operationDay[1]}
                />
                <InputLabel>{operationDay[1]}</InputLabel>
                <input
                  type="checkbox"
                  checked={opDayIsChecked[2]}
                  onChange={handleOpDayChange}
                  id="운영일"
                  name="2"
                  value={operationDay[2]}
                />
                <InputLabel>{operationDay[2]}</InputLabel>
                <input
                  type="checkbox"
                  checked={opDayIsChecked[3]}
                  onChange={handleOpDayChange}
                  id="운영일"
                  name="3"
                  value={operationDay[3]}
                />
                <InputLabel>{operationDay[3]}</InputLabel>
                <input
                  type="checkbox"
                  checked={opDayIsChecked[4]}
                  onChange={handleOpDayChange}
                  id="운영일"
                  name="4"
                  value={operationDay[4]}
                />
                <InputLabel>{operationDay[4]}</InputLabel>
                <input
                  type="checkbox"
                  checked={opDayIsChecked[5]}
                  onChange={handleOpDayChange}
                  id="운영일"
                  name="5"
                  value={operationDay[5]}
                />
                <InputLabel>{operationDay[5]}</InputLabel>
                <input
                  type="checkbox"
                  checked={opDayIsChecked[6]}
                  onChange={handleOpDayChange}
                  id="운영일"
                  name="6"
                  value={operationDay[6]}
                />
                <InputLabel>{operationDay[6]}</InputLabel>
              </div>
              <br></br>
              <div className={classes.rowComponent}>
                <InputLabel>문의처</InputLabel>
                <Select
                  id="관리기관"
                  value={inquiries}
                  onChange={handleInquiriesChange}
                >
                  <MenuItem value="북구청 교통과">북구청 교통과</MenuItem>
                  <MenuItem value="남구청 교통과">남구청 교통과</MenuItem>
                  <MenuItem value="동구청 교통과">동구청 교통과</MenuItem>
                  <MenuItem value="서구청 교통과">서구청 교통과</MenuItem>
                  <MenuItem value="중구청 교통과">중구청 교통과</MenuItem>
                  <MenuItem value="달서구청 교통과">달서구청 교통과</MenuItem>
                  <MenuItem value="달성군청 교통과">달성군청 교통과</MenuItem>
                  <MenuItem value="수성구청 교통과">수성구청 교통과</MenuItem>
                </Select>
              </div>
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="전화번호"
                label="전화번호(예-0531234567)"
                type="number"
                pattern="0\d{1,2}\-\d{3,4}\-\d{4}"
                fullWidth
                onChange={handleRepairInfoChange}
              />
            </div>
          </>
        );
      case "대여소":
        return (
          //대여소 선택
          <>
            <div>
              <InputLabel>주소 : {reportAddress}</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="상세주소"
                label="상세주소(예-1가 공평로 88)"
                type="text"
                fullWidth
                onChange={handleRentalInfoChange}
              />
              <br></br>

              <div className={classes.rowComponent}>
                <InputLabel>대여시간</InputLabel>
                <Select
                  id="대여시간1"
                  value={rtTime1}
                  onChange={handleRtTime1Change}
                >
                  {operationTime.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel> ~ </InputLabel>
                <Select
                  id="대여시간2"
                  value={rtTime2}
                  onChange={handleRtTime2Change}
                >
                  {operationTime.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <br></br>
              <div className={classes.rowComponent}>
                <InputLabel>반납시간</InputLabel>
                <Select
                  id="반납시간"
                  value={returnTime}
                  onChange={handleReturnTimeChange}
                >
                  {operationTime.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className={classes.title}>항목을 선택하시오. </div>
          </>
        );
    }
  };

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  const submitReport = () => {
    switch (facility) {
      case "공기주입기":
        let airpumpUploadReport = {
          신고날짜: getTimestamp(),
          시설종류: facility,
          번호: count,
          위치: reportAddress + " " + airpumpInfo.상세주소,
          위도: reportlatlng.위도,
          경도: reportlatlng.경도,
          타입: type,
          관리기관: management,
          전화번호: airpumpInfo.전화번호
        };
        if (
          airpumpInfo.전화번호 === undefined ||
          airpumpInfo.전화번호 === null ||
          airpumpInfo.전화번호 === ""
        ) {
          props.alertMessage("전화번호를 입력하지 않았습니다!", "error");
        } else if (
          airpumpInfo.상세주소 === undefined ||
          airpumpInfo.상세주소 === null ||
          airpumpInfo.상세주소 === ""
        ) {
          props.alertMessage("상세주소를 입력하지 않았습니다!", "error");
        } else {
          console.log(airpumpUploadReport);
          database
            .collection("NewFacility")
            .doc(`${airpumpUploadReport.위도}`)
            .set(Object.assign({}, airpumpUploadReport))
            .then((res) => {
              console.log(res);
              //카운트 증가
              setCount(count + 1);
              props.alertMessage("신고완료", "success");
              setAirpumpInfo({ 상세주소: "", 전화번호: 0 });
            });
            props.displayNewReport(false);
            props.setReportMode(false)
            if(newFacility){
              props.displayNewFacility(false)
              sleep(1000).then(() => props.displayNewFacility(true));
            }else{
              props.displayNewFacility(true)
            }
        }

        break;
      case "보관소":
        let parkingUploadReport = {
          신고날짜: getTimestamp(),
          시설종류: facility,
          번호: count,
          위치: reportAddress + " " + parkInfo.상세주소,
          위도: reportlatlng.위도,
          경도: reportlatlng.경도,
          관리기관: management,
          전화번호: parkInfo.전화번호
        };
        if (
          parkInfo.전화번호 === undefined ||
          parkInfo.전화번호 === null ||
          parkInfo.전화번호 === ""
        ) {
          props.alertMessage("전화번호를 입력하지 않았습니다!", "error");
        } else if (
          parkInfo.상세주소 === undefined ||
          parkInfo.상세주소 === null ||
          parkInfo.상세주소 === ""
        ) {
          props.alertMessage("상세주소를 입력하지 않았습니다!", "error");
        } else {
          database
            .collection("NewFacility")
            .doc(`${parkingUploadReport.위도}`)
            .set(parkingUploadReport)
            .then((res) => {
              console.log(res);
              //카운트 증가
              setCount(count + 1);
              props.alertMessage("신고완료", "success");
              setParkInfo({ 상세주소: "", 전화번호: 0 });
            });
            props.displayNewReport(false);
            props.setReportMode(false)
            if(newFacility){
              props.displayNewFacility(false)
              sleep(1000).then(() => props.displayNewFacility(true));
            }else{
              props.displayNewFacility(true)
            }
        }

        break;
      case "수리센터":
        const opDayArr = Array.from(opDay);
        const opMonthArr = Array.from(opMonth);
        for (let i = 0; i < opDayArr.length; i++) {
          opDayString = opDayString + " " + opDayArr[i];
        }
        for (let i = 0; i < opMonthArr.length; i++) {
          opMonthString = opMonthString + " " + opMonthArr[i];
        }
        setOpDayString(opDayString);
        setOpMonthString(opMonthString);
        let repairUploadReport = {
          신고날짜: getTimestamp(),
          시설종류: facility,
          번호: count,
          위치: reportAddress + " " + repairInfo.상세주소,
          위도: reportlatlng.위도,
          경도: reportlatlng.경도,
          운영기간: opMonthString,
          운영시간: opTime1 + "~" + opTime2,
          운영일: opDayString,
          관리기관: inquiries,
          전화번호: repairInfo.전화번호
        };
        if (
          repairUploadReport.관리기관 === undefined ||
          repairUploadReport.관리기관 === null ||
          repairUploadReport.관리기관 === ""
        ) {
          props.alertMessage("문의처를 입력하지 않았습니다!", "error");
        } else if (
          repairInfo.전화번호 === undefined ||
          repairInfo.전화번호 === null ||
          repairInfo.전화번호 === ""
        ) {
          props.alertMessage("전화번호를 입력하지 않았습니다!", "error");
        } else if (
          repairInfo.상세주소 === undefined ||
          repairInfo.상세주소 === null ||
          repairInfo.상세주소 === ""
        ) {
          props.alertMessage("상세주소를 입력하지 않았습니다!", "error");
        } else if (
          repairUploadReport.운영기간 === undefined ||
          repairUploadReport.운영기간 === null ||
          repairUploadReport.운영기간 === ""
        ) {
          props.alertMessage("운영기간을 입력하지 않았습니다!", "error");
        } else if (
          repairUploadReport.운영시간 === undefined ||
          repairUploadReport.운영시간 === null ||
          repairUploadReport.운영시간 === ""
        ) {
          props.alertMessage("운영시간을 입력하지 않았습니다!", "error");
        } else if (
          repairUploadReport.운영일 === undefined ||
          repairUploadReport.운영일 === null ||
          repairUploadReport.운영일 === ""
        ) {
          props.alertMessage("운영일을 입력하지 않았습니다!", "error");
        } else {
          database
            .collection("NewFacility")
            .doc(`${repairUploadReport.위도}`)
            .set(repairUploadReport)
            .then((res) => {
              console.log(res);
              //카운트 증가
              setCount(count + 1);
              props.alertMessage("신고완료", "success");
              setRepairInfo({
                상세주소: "",
                전화번호1: 0
              });
              opDayString = " ";
              opDay.clear();
              setOpDay(opDay);
              setOpDayString(opDayString);
              opMonthString = " ";
              opMonth.clear();
              setOpMonth(opMonth);
              setOpMonthString(opMonthString);
            });
            props.displayNewReport(false);
            props.setReportMode(false)
            if(newFacility){
              props.displayNewFacility(false)
              sleep(1000).then(() => props.displayNewFacility(true));
            }else{
              props.displayNewFacility(true)
            }
        }

        break;
      case "대여소":
        let rentalUploadReport = {
          신고날짜: getTimestamp(),
          시설종류: facility,
          번호: count,
          위치: reportAddress + " " + rentalInfo.상세주소,
          위도: reportlatlng.위도,
          경도: reportlatlng.경도,
          대여시간: rtTime1 + "~" + rtTime2,
          반납시간: returnTime
        };
        if (
          rentalUploadReport.대여시간 === undefined ||
          rentalUploadReport.대여시간 === null ||
          rentalUploadReport.대여시간 === ""
        ) {
          props.alertMessage("대여시간을 입력하지 않았습니다!", "error");
        } else if (
          rentalUploadReport.반납시간 === undefined ||
          rentalUploadReport.반납시간 === null ||
          rentalUploadReport.반납시간 === ""
        ) {
          props.alertMessage("반납시간을 입력하지 않았습니다!", "error");
        } else if (
          rentalInfo.상세주소 === undefined ||
          rentalInfo.상세주소 === null ||
          rentalInfo.상세주소 === ""
        ) {
          props.alertMessage("상세주소를 입력하지 않았습니다!", "error");
        } else {
          database
            .collection("NewFacility")
            .doc(`${rentalUploadReport.위도}`)
            .set(rentalUploadReport)
            .then((res) => {
              console.log(res);
              //카운트 증가
              setCount(count + 1);
              props.alertMessage("신고완료", "success");
              setRentalInfo({ 상세주소: "" });
            });
            props.displayNewReport(false);
            props.setReportMode(false)
            if(newFacility){
              props.displayNewFacility(false)
              sleep(1000).then(() => props.displayNewFacility(true));
            }else{
              props.displayNewFacility(true)
            }
        }
      
        break;
      default:
        //props.displayNewReport(false);
    }
    
  };

  return (
    <div>
      <Dialog
        open={newFacilityReport}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">새로운 시설 신고</DialogTitle>
        <DialogContent>
          <DialogContentText>
            신고할 시설 종류와 신고내역을 작성해주세요.
          </DialogContentText>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">시설 선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={facility}
              onChange={handleChange}
            >
              <MenuItem value={"공기주입기"}>공기주입기</MenuItem>
              <MenuItem value={"보관소"}>보관소</MenuItem>
              <MenuItem value={"수리센터"}>수리센터</MenuItem>
              <MenuItem value={"대여소"}>대여소</MenuItem>
            </Select>
          </FormControl>

          {showInputForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={submitReport} color="primary">
            전송
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    newFacilityReport: state.report.newFacilityReport,

    reportlatlng: state.report.reportlatlng,
    reportAddress: state.report.reportAddress,
    newFacility: state.mapControl.newFacility,
  };
};

const mapDispatchToProps = {
  displayNewReport: displayNewReport,
  alertMessage: alertMessage,
  displayNewFacility: displayNewFacility,
  setReportMode: setReportMode
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFacilityReport);
