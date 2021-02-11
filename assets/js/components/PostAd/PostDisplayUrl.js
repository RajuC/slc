import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography,
    makeStyles,
    Container,
    InputAdornment
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { postAdActions } from '../../actions';
// import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';

import PostHeader from './PostHeader';
// import GoogleMaps from './GoogleMaps';



const useStyles = makeStyles((theme) => ({
    root: {
    },
    cardContent: {
        marginTop: 20,
    },
    alert: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(1),
        },
      },
}));


const imagesList = [
    {
      height: 480,
      imgRef: "images/2277-9670202e80-1.jpg",
      name: "1.jpg",
      url:
        "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-1.jpg?alt=media&token=09359009-4c88-4b84-a1a1-d87cb02c36a1",
      width: 640,
    },
    {
      height: 480,
      imgRef: "images/2277-9670202e80-2.jpg",
      name: "2.jpg",
      url:
        "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-2.jpg?alt=media&token=8c784642-eae9-4a66-a48f-1ad9ef478b39",
      width: 640,
    },
    {
      height: 1024,
      imgRef: "images/2277-9670202e80-3.jpg",
      name: "3.jpg",
      url:
        "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-3.jpg?alt=media&token=4ee9fb35-ba60-48b2-a8e3-f774e2087c0e",
      width: 768,
    },
    {
      height: 1024,
      imgRef: "images/2277-9670202e80-4.jpg",
      name: "4.jpg",
      url:
        "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-4.jpg?alt=media&token=e80727f9-2d5e-4dfc-813d-15b0ab6b212d",
      width: 768,
    },
    {
      height: 470,
      imgRef: "images/2277-9670202e80-5.jpg",
      name: "5.jpg",
      url:
        "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-5.jpg?alt=media&token=bcd91f48-fdf1-4eea-8c4a-4a1cd7567f23",
      width: 1024,
    },
    {
      height: 470,
      imgRef: "images/2277-9670202e80-6.jpg",
      name: "6.jpg",
      url:
        "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-6.jpg?alt=media&token=b7c39c89-84b8-4ba9-b842-e1e9e073132c",
      width: 1024,
    },
  ];
  

const mandatoryText = 'Asking Price field cannot be empty';
const valObj = { value: '', error: false, errorText: 'ex: asking price helper text' };

const PostDisplayUrl = () => {
    // const { dispatch, askingPrice } = props;
    const classes = useStyles();
    const [askingPrice, setAskingPrice] = useState(valObj);
    const postAd = useSelector(state => state.postAd.details);
    const dispatch = useDispatch();

// console.log("(askingPriceVal)========================== askingPriceVal", askingPriceVal );
    // const handleChange = (askingPrice) => {
    //     if (askingPrice) {
    //         dispatch(postAdActions.addAskingPrice(askingPrice));
    //     }
    // };


    const handleChange = (val) => {
        if (val) {
            setAskingPrice({
                ...valObj,
                value: val
            });
        } else {
            setAskingPrice({
                ...valObj,
                error: true,
                errorText: mandatoryText
            });
        }
    };

    const handleDispatch = (val) => {
        if (val) {
            dispatch(postAdActions.addAskingPrice({
                ...valObj,
                value: val
            }));
        } else {
            dispatch(postAdActions.addAskingPrice({
                ...valObj,
                error: true,
                errorText: mandatoryText
            }));
        }
    };




    const title = 'Select Display Image for your Ad';
    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            <PostHeader title={title} />
            <Card>
                <CardContent className={classes.cardContent}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={4}
                            sm={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                id="vehicle-asking-Price"
                                helperText="Please enter the Asking Price"
                                label="Asking Price"
                                name="askingPrice"
                                onChange={e => handleChange(e.target.value)}
                                onBlur={e => handleDispatch(e.target.value)}
                                required
                                value={askingPrice.value}
                                variant="outlined"
                                error={(postAd.asking_price && postAd.asking_price.error) ? postAd.asking_price.error : askingPrice.error}
                                helperText={(postAd.asking_price && postAd.asking_price.error)? postAd.asking_price.errorText : askingPrice.errorText}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                }}
                            />

                        </Grid>
                        <Grid
                            item
                            md={8}
                            sm={6}
                            xs={12}
                        >
                            <Typography variant="body2" gutterBottom>
                                Determine a competitive price by comparing your vehicle's information and mileage to similar vehicles
                                for sale by dealers and private sellers in your area. Then consider pricing your vehicle within range.
                                Be sure to provide Seller's Comments and photos to highlight the best features of your vehicle, especially if your asking price is above average.
                            </Typography>

                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    {/* <Typography className={classes.submit}>
                            <Button
                                color="primary"
                                variant="contained"
                                // onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Typography> */}
                </Box>
            </Card>
        </Container>
    );
};

// PostAskingPrice.propTypes = {
//     className: PropTypes.string
// };


// //from store to props
// const mapStateToProps = state => {
//     // console.log("Asking Price state====", state)
//     const { askingPrice } = state.postAd;
//     return { askingPrice }
// }



// export default connect(mapStateToProps, null)(PostAskingPrice);




export default PostDisplayUrl;


