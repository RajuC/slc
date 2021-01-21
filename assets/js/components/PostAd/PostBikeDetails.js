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
    Container
} from '@material-ui/core';

import PostHeader from './PostHeader';

const states = [
    {
        value: 'Hero Honda',
        label: 'Hero Honda'
    },
    {
        value: 'Bajaj',
        label: 'Bajaj'
    },
    {
        value: 'Yamaha',
        label: 'Yamaha'
    }
];

const useStyles = makeStyles(() => ({
    root: {
    },
    cardContent:{
        marginTop:20,
    },
    cardGrid:{
        marginTop:20,
    }
}));

const PostBikeDetails = ({ className, ...rest }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        firstName: 'Katarina',
        lastName: 'Smith',
        email: 'demo@devias.io',
        phone: '',
        state: 'Alabama',
        country: 'USA'
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const title = 'Enter Bike Details';
    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            <PostHeader title={title}/>
            <form
                autoComplete="off"
                noValidate
                className={classes.root}
                {...rest}
            >
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
                                <TextField
                                    fullWidth
                                    helperText="Please specify the first name"
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={values.firstName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    value={values.lastName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.phone}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    onChange={handleChange}
                                    required
                                    value={values.country}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Select Brand"
                                    name="brand"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.state}
                                    variant="outlined"
                                >
                                    {states.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        p={2}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Save details
          </Button>
                    </Box>
                </Card>
            </form>
        </Container>
    );
};

PostBikeDetails.propTypes = {
    className: PropTypes.string
};

export default PostBikeDetails;




