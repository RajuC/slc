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
    makeStyles,
    Container,
    Typography
} from '@material-ui/core';

import PostHeader from './PostHeader';
import GoogleMaps from './GoogleMaps';


const useStyles = makeStyles((theme) => ({
    root: {
    },
    cardContent: {
        marginTop: 20,
    },
    submit: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const PostLocationDetails = ({ className, ...rest }) => {
    const classes = useStyles();


    const title = 'Enter Location Details';
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
                            md={6}
                            xs={12}
                        >
                            <GoogleMaps />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    <Typography >
                        Tips
                        1. search your locality without spaces
                        2. don't search cities directly, search sub-region or region 
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
};

PostLocationDetails.propTypes = {
    className: PropTypes.string
};

export default PostLocationDetails;




