import React from "react";

import {
  makeStyles,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import numeral from "numeral";

import CustomButtom from "../../Layouts/CustomButton"
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
    margin: "2%",
  },
  cardContent: {
    flexGrow: 1,
    padding:0,
    paddingLeft:"5%"
  },
  priceButton: {
    float: "left",
    fontSize: "15px",
    // marginLeft: 'auto', ?? to right
  },
}));

const MiniAd = ({ ad }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        //   image="https://motors.stylemixthemes.com/classified/wp-content/uploads/sites/2/2015/12/1_3-255x160.jpg"
        // image="https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-1601282i9m-1.jpg?alt=media&token=a8f26719-1ffa-49cc-b5cd-cc7d6ee4df02"
        image={ad.display_image_url.url}
        // title="Image title"
      />
      <Divider />
      <CardActions>
        <CustomButtom
          size="small"
          variant="contained"
          className={classes.priceButton}
        >
          {"Rs " + numeral(ad.asking_price).format(`0,0.00`) + " /-"}
        </CustomButtom>
      </CardActions>
      <CardContent className={classes.cardContent}>
        <Link
          variant="body2"
          color="textPrimary"
          component={RouterLink}
          underline="always"
          // to={{ pathname: `/listing/${ad.id}/view`, state: { basicDetails: ad } }}
          to={`/listing/${ad.id}/view`}
        >
          {ad.name + " | " + ad.year + " yr | " + ad.km_driven + " km | " + ad.fuel_type}
        </Link>
        {/* <Typography
          gutterBottom
          variant="h6"
          component="h4"
          color="textPrimary"
        >
          {ad.name}
        </Typography> */}
        {/* <Typography variant="body2" component="h5">
          {ad.year + " | " + ad.km_driven + " | " + ad.fuel_type}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default MiniAd;
