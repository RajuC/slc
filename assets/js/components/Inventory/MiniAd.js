import React from "react";

// import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

import {
  makeStyles,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // width: '380px',

    // minWidth: '20%',
    // paddingTop: '56.25%', // 16:9
    // position:"absolute",
    height: "30vh",
    // marginTop: "5%",
    // marginLeft: "5%",
    // marginRight: "5%",
    // objectFit: "cover",
    // minWidth:'200%',
    // paddingTop: '66.66%', // 3:2
    margin: "5%",
  },
  cardContent: {
    flexGrow: 1,
  },
  priceButton: {
    float: "left",
    fontSize: "15px",
    // marginLeft: 'auto', ?? to right
  },
}));

export default function MiniAd() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        //   image="https://motors.stylemixthemes.com/classified/wp-content/uploads/sites/2/2015/12/1_3-255x160.jpg"
        // image="https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-1601282i9m-1.jpg?alt=media&token=a8f26719-1ffa-49cc-b5cd-cc7d6ee4df02"
        image="https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-1.jpg?alt=media&token=09359009-4c88-4b84-a1a1-d87cb02c36a1"
        title="Image title"
      />
      <Divider />
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.priceButton}
        >
          Rs. 191100.00 /-
        </Button>
      </CardActions>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="h4" color="textPrimary">
          Maruthi Suzuki Amaze 1.2 VX
        </Typography>
        <Typography variant="h6" component="h5">
          2019 Yr | 123456 Km | Petrol | Automatic
        </Typography>
      </CardContent>
    </Card>
  );
}
