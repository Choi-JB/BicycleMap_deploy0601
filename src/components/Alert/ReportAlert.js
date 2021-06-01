import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { setReportMode } from "../../redux/index";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const CustomizedSnackbars = (props) => {
  const classes = useStyles();

  const { reportMode } = props;

  const vertical = "top";
  const horizontal = "center";

  const handleClose = (event) => {
    props.setReportMode();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={reportMode}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        {/* error, warning, info, success */}
        <Alert onClose={handleClose} severity="info">
          신규장소를 추가하고 싶은 곳을 클릭해 주세요!
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reportMode: state.report.reportMode
  };
};
const mapDispatchToProps = {
  setReportMode: setReportMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedSnackbars);
