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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    // width: '300px',
    // height: '250px',
    height: '30vh',
    marginLeft:'15%',
    marginRight: '15%',
    objectFit: "cover",
  },
  cardContent: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  priceButton: {
    float: "left",
    fontSize: "15px",
    // marginLeft: 'auto', ?? to right
  },
});



export default function MiniAdd() {
  const classes = useStyles();

  return (

    <Card className={classes.card}>
    <CardMedia
      className={classes.cardMedia}
    //   image="https://motors.stylemixthemes.com/classified/wp-content/uploads/sites/2/2015/12/1_3-255x160.jpg"
      image="https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-1089217ka3-3.jpg?alt=media&token=d33f805a-d566-4a62-a686-09d149ba8491"
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
        <Typography gutterBottom variant="h7" component="h4">
          Maruthi Suzuki - Amaze - 1.2 VX
        </Typography>
        <Typography gutterBottom variant="h7" component="h5">
          2019 yr | 123456 km | petrol | Automatic
        </Typography>
      </CardContent>
  </Card>
  );
}





