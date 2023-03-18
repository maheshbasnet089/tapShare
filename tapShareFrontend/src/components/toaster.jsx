import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const Toaster = ({ props }) => {
  return (
    <div>
      <Snackbar
        sx={{
          display: props?.data.open ? "block" : "none",
        }}
        open={props?.data.open}
        onClose={() => {
          props?.close(false);
        }}
        TransitionComponent={TransitionLeft}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={`${props?.data.severity}`}>
          {props?.data.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toaster;
