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


const mandatoryText = 'Asking Price field cannot be empty';
const valObj = { value: '', error: false, errorText: 'ex: asking price helper text' };

const PostAskingPrice = () => {
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




    const title = 'Enter Asking Price';
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




export default PostAskingPrice;