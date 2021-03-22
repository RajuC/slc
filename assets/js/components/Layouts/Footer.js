import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    // icon: {
    //   marginRight: theme.spacing(2),
    // },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
  }));

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          www.srilaxmicars.com
          </Link>
          {' '}
        {new Date().getFullYear()}
        {'. | '}
        <Link color="inherit" href="/about_us">
          About Us
          </Link>
        {' | '}
        <Link color="inherit" href="/contact_us">
          Contact Us
          </Link>
      </Typography>
    );
  }

  function AboutUs() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="/terms">
          Terms of Use
          </Link>
          {' | '}
          <Link color="inherit" href="/policy">
          Privacy Policy
          </Link>
      </Typography>
    );
  }

const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];






  const Footer = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" component="footer" className={classes.footer}>
        {/* <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        <Box mt={2}>
          <Copyright />
        </Box>
        <Box mt={2}>
          <AboutUs />
        </Box>
      </Container>
    );
  }
  
  export default Footer;


