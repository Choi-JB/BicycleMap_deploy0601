import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {} from "../../redux/index";

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
  const [open, setOpen] = React.useState(false);

  const { message } = props;

  useEffect(() => {
    setOpen(true);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const vertical = "bottom";
  const horizontal = "right";

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={message.type}>
          {/* error, warning, info, success */}
          {message.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.report.message
  };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedSnackbars);
