import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";


// https://codesandbox.io/s/mzrwwxxoop?fontsize=14&file=/src/index.js


// #006ba1

const styles = () => ({
  root: {
    color: "white",
    backgroundColor: "#169f36",
    "&:hover": {
      backgroundColor: "#006ba1",
    },
  },
});

function CustomButton(props) {
  return <Button variant="contained" color="primary" size="small" {...props} />;
}

export default withStyles(styles)(CustomButton);
