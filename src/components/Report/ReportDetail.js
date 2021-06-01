import React, { useEffect } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { displayReportDetail } from "../../redux/index";
import { database } from "../../firebase/firebase";

//import { ip } from "../../redux/ip";
//import axios from "axios";

const ReportDetail = (props) => {
  const { reportDetail, selectedMarker } = props;
  const [dbResult, setDbResult] = React.useState([
    {
      주소: "",
      상태: "",
      신고날짜: "",
      비고: ""
    },
    {
      주소: "",
      상태: "",
      신고날짜: "",
      비고: ""
    },
    {
      주소: "",
      상태: "",
      신고날짜: "",
      비고: ""
    }
  ]);
  var noneList = [
    {
      주소: "",
      상태: "",
      신고날짜: "",
      비고: ""
    },
    {
      주소: "",
      상태: "",
      신고날짜: "",
      비고: ""
    },
    {
      주소: "",
      상태: "",
      신고날짜: "",
      비고: ""
    }
  ];
  var DBRlist = [];
  const [idx, setIdx] = React.useState(noneList.length - 1);
  const handleClose = () => {
    props.displayReportDetail(false);
  };
  useEffect(() => {
    showReportDetail();
  }, [reportDetail]);

  const showReportDetail = () => {
    setIdx(noneList.length - 1);
    setDbResult(noneList);
    database
      .collection("OldFacility")
      .doc(`${selectedMarker.위도}`)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          database
            .collection("OldFacility")
            .doc(`${selectedMarker.위도}`)
            .collection("ReportLog")
            .where("신고날짜", ">", "2021-05-01 00:00:00")
            .onSnapshot((res) => {
              res.forEach((doc) => {
                DBRlist.push(doc.data());
              });
              setDbResult(noneList.concat(DBRlist));
              setIdx(noneList.length + DBRlist.length - 1);
            });
        } else {
          /*database
            .collection("NewFacility")
            .doc(`${selectedMarker.위도}`)
            .get()
            .then((res) => {
              console.log(res);
              console.log(doc.data());
              setDbResult(doc.data());
            });*/
          setDbResult(noneList);
          setIdx(noneList.length - 1);
        }
      });
  };
  return (
    <div>
      <Dialog
        open={reportDetail}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">신고 내역</DialogTitle>
        <DialogTitle id="form-dialog-title">
          {/* {dbResult[idx].주소} */}
          {selectedMarker.위치}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TableContainer component={Paper}>
              <Table aria-label="caption table">
                <caption> </caption>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">신고날짜</TableCell>
                    <TableCell align="center">신고내역</TableCell>
                    <TableCell align="center">비고</TableCell>
                  </TableRow>
                </TableHead>

                {dbResult[idx].상태===''?(
                  <TableBody>

                    <TableRow>
                    <TableCell align="center">
                      최근 신고 내역이 없습니다
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    </TableRow>

                  </TableBody>
                ):(
                  <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {dbResult[idx].신고날짜}
                    </TableCell>
                    <TableCell align="center">{dbResult[idx].상태}</TableCell>
                    <TableCell align="center">{dbResult[idx].비고}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      {dbResult[idx - 1].신고날짜}
                    </TableCell>
                    <TableCell align="center">
                      {dbResult[idx - 1].상태}
                    </TableCell>
                    <TableCell align="center">
                      {dbResult[idx - 1].비고}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      {dbResult[idx - 2].신고날짜}
                    </TableCell>
                    <TableCell align="center">
                      {dbResult[idx - 2].상태}
                    </TableCell>
                    <TableCell align="center">
                      {dbResult[idx - 2].비고}
                    </TableCell>
                  </TableRow>
                </TableBody>

                )}
                

              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reportDetail: state.report.reportDetail,

    selectedMarker: state.facilities.selectedMarker
  };
};

const mapDispatchToProps = {
  displayReportDetail: displayReportDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
