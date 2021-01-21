import React from "react";

// import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import MiniAdd from './MiniAdd';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

import {
    makeStyles,
    Container,
    Grid
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(8),
  },
}));


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Adds() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="lg">
    {/* End hero unit */}
    <Grid container spacing={4}>
      {cards.map((card) => (
        <Grid item key={card} xs={12} sm={6} md={4}>
          <MiniAdd />
        </Grid>
      ))}
    </Grid>
  </Container>

  );
}

