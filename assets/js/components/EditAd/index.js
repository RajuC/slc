import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
// import PostAccountDetails from './PostAccountDetails';
import PostBikeDetails from './PostBikeDetails';
import PostCarDetails from './PostCarDetails';
import PostLocationDetails from './PostLocationDetails';
import PostSubmitDetails from './PostSubmitDetails';
import PostCarFeatures from './PostCarFeatures';
import PostSellerDetails from './PostSellerDetails';
import PostAskingPrice from './PostAskingPrice';



import PostImages from './PostImages';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { userService } from '../../services/userService';
import { userActions } from "../../actions";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const currentUser = useSelector(state => state.currentUser)


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                    <PostSellerDetails />
                    <PostImages />
                    <PostLocationDetails />
                    <PostAskingPrice />
                    {/* { !(currentUser && currentUser.loggedIn && currentUser.user) && 
                        <PostAccountDetails />
                    } */}
                    <PostSubmitDetails />
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 100,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


const PostAd = () => {
    const { id } = useParams();
    console.log("(PostAd)========================== Ad Id ", id );
    // const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const currentUser = useSelector(state => state.currentUser);
    

    useEffect(() => {
        if(currentUser && currentUser.loggedIn && currentUser.user) {
            userService.getUser()
            .then(
                user => { 
                    console.log("user already logged in : ");
                },
                error => {
                    userService.logout()
                    // dispatch(userActions.userLogout("/postAd"));
                    console.log("user not logged in", error);
                }
            );
        }
      }, []);

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Sell Car" {...a11yProps(0)} />
                        <Tab label="Sell Bike" {...a11yProps(1)} />

                    </Tabs>
                </AppBar>
            </Container>
            <TabPanel value={value} index={0}>
                <PostCarDetails />
                <PostCarFeatures />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PostBikeDetails />
            </TabPanel>
        </div>
    );
}

export default PostAd;
