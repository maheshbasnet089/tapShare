import React from "react";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
const Toaster = ({ data, close }) => {
  const handleClose = () => {
    close(false);
  };
  return (
    <div>
      <Snackbar
        sx={{
          display: data.open ? "block" : "none",
        }}
        open={data.open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={data.severity}>
          {data.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toaster;
