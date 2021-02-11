import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useLocation, matchPath } from 'react-router-dom';
import { useParams } from "react-router";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
  Link,
  useMediaQuery,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  ListSubheader,
  Card,
  CardContent,
  CardHeader,
  Paper,
  TextField,
  Box,
  Grid,
  Container,
  TablePagination,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useTheme } from "@material-ui/core/styles";
import NavItems from "../../Layouts/NavItems";
import Header from "./Header";
import { apiService } from "../../../services/apiService";
import MiniAd from "../MiniAd";
import NavItem from './NavItem';
import Footer from "../../Layouts/Footer";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#153e4d",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#153e4d",
    color: "white",
    borderRadius: 0,
  },
  CardContent: {
    padding: 0,
  },
  CardHeader: {
    marginLeft: theme.spacing(8),
    padding: 0,
  },
  selectField: { marginLeft: "4%", width: "90%" },
  rangeSelectField: { marginLeft: "8%", width: "80%" },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const sections = [
  {
    subheader: "Management",
    items: [
      {
        title: "Customers",
        //   icon: UsersIcon,
        href: "/app/management/customers",
        items: [
          {
            title: "List Customers",
            href: "/app/management/customers",
          },
          {
            title: "View Customer",
            href: "/app/management/customers/1",
          },
          {
            title: "Edit Customer",
            href: "/app/management/customers/1/edit",
          },
        ],
      },
      {
        title: "Products",
        //   icon: ShoppingCartIcon,
        href: "/app/management/products",
        items: [
          {
            title: "List Products",
            href: "/app/management/products",
          },
          {
            title: "Create Product",
            href: "/app/management/products/create",
          },
        ],
      },
      {
        title: "Orders",
        //   icon: FolderIcon,
        href: "/app/management/orders",
        items: [
          {
            title: "List Orders",
            href: "/app/management/orders",
          },
          {
            title: "View Order",
            href: "/app/management/orders/1",
          },
        ],
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const typeOptions = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "car",
    name: "Cars",
  },
  {
    id: "bike",
    name: "Bikes",
  },
];
const fuelTypeOptions = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "petrol",
    name: "Petrol",
  },
  {
    id: "diesel",
    name: "Diesel",
  },
  {
    id: "cng",
    name: "CNG",
  },
  {
    id: "electric",
    name: "Electric",
  },
];

const applyPagination = (ads, page, limit) => {
  return ads.slice(page * limit, page * limit + limit);
};

const applyFilters = (ads, filters) => {
  return ads.filter((ad) => {
    let matches = true;

    if (filters.type && ad.type !== filters.type) {
      matches = false;
    }

    if (filters.brand && ad.brand !== filters.brand) {
      matches = false;
    }

    if (filters.model && ad.model !== filters.model) {
      matches = false;
    }
    // need to write conditions for greater than and lesser than years
    if (filters.year && ad.year !== filters.year) {
      matches = false;
    }
    // need to write conditions for greater than and lesser than price
    if (filters.price && ad.asking_price !== filters.price) {
      matches = false;
    }
    // need to write conditions for greater than and lesser than kmDriven
    if (filters.kmDriven && ad.km_driven !== filters.kmDriven) {
      matches = false;
    }
    if (filters.fuelType && ad.fuel_type !== filters.fuelType) {
      matches = false;
    }

    if (filters.transmission && ad.transmission !== filters.transmission) {
      matches = false;
    }

    return matches;
  });
};

const SideBar = () => {
  console.log("(Active Ads)========================== type ", ads_type);
  const { ads_type } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ads, setAds] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState({
    type: null,
    brand: null,
    model: null,
    minYear: null,
    maxYear: null,
    fuelType: null,
    price: null,
    minKmDriven: null,
    maxKmDriven: null,
    transmission: null,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllAds = async () => {
    try {
      const response = await apiService.listAllAds();

      setAds(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (ads_type == "bikes") {
      getAllAds();
    } else if (ads_type == "cars") {
      getAllAds();
    } else {
      getAllAds();
    }
  }, []);

  useEffect(() => {
    ismobile ? handleDrawerClose() : handleDrawerOpen();
  }, [ismobile]);

  const handleTypeChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      type: value,
    }));
  };

  const handleBrandChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: value,
    }));
  };

  const handleModelChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      model: value,
    }));
  };

  const handleMinYearChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      minYear: value,
    }));
  };

  const handleMaxYearChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      Maxyear: value,
    }));
  };

  const handleFuelTypeChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      fuelType: value,
    }));
  };

  const handlePriceChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      price: value,
    }));
  };

  const handleMinKmDrivenChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      minKmDriven: value,
    }));
  };

  const handleMaxKmDrivenChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      maxKmDriven: value,
    }));
  };

  const handleTransmissionChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      transmission: value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var filteredAds = [];
  var paginatedAds = [];
  // Usually query is done on backend with indexing solutions
  if (ads) {
    filteredAds = applyFilters(ads, filters);
    paginatedAds = applyPagination(filteredAds, page, limit);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.toolbarTitle} noWrap>
            <Link href="/" color="inherit">
              Sri Laxmi Cars
            </Link>
          </Typography>
          <NavItems />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        {/* <Card className={classes.card}>
          <CardHeader title="Filter Ads" className={classes.CardHeader} />
          <Divider />
          <CardContent className={classes.CardContent}> */}
            <Paper variant="outlined">
              <Box p={2}>
                {sections.map((section) => (
                  <List
                    key={section.subheader}
                    subheader={
                      <ListSubheader disableGutters disableSticky>
                        {section.subheader}
                      </ListSubheader>
                    }
                  >
                    {renderNavItems({
                      items: section.items,
                      pathname: location.pathname,
                    })}
                  </List>
                ))}
              </Box>
              <Box className={classes.filters} mt={4} mb={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.selectField}
                      fullWidth
                      label="Type"
                      name="type"
                      size="small"
                      onChange={handleTypeChange}
                      select
                      SelectProps={{ native: true }}
                      value={filters.type || "all"}
                      variant="outlined"
                    >
                      {typeOptions.map((typeOption) => (
                        <option key={typeOption.id} value={typeOption.id}>
                          {typeOption.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.selectField}
                      fullWidth
                      label="Brand"
                      name="brand"
                      size="small"
                      onChange={handleBrandChange}
                      select
                      SelectProps={{ native: true }}
                      value={filters.brand || "all"}
                      variant="outlined"
                    >
                      {typeOptions.map((typeOption) => (
                        <option key={typeOption.id} value={typeOption.id}>
                          {typeOption.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.selectField}
                      fullWidth
                      label="Model"
                      name="model"
                      size="small"
                      onChange={handleModelChange}
                      select
                      SelectProps={{ native: true }}
                      value={filters.model || "all"}
                      variant="outlined"
                    >
                      {typeOptions.map((typeOption) => (
                        <option key={typeOption.id} value={typeOption.id}>
                          {typeOption.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.selectField}
                      fullWidth
                      label="Fuel Type"
                      name="fuelType"
                      size="small"
                      onChange={handleFuelTypeChange}
                      select
                      SelectProps={{ native: true }}
                      value={filters.fuelType || "all"}
                      variant="outlined"
                    >
                      {fuelTypeOptions.map((fuelTypeOption) => (
                        <option
                          key={fuelTypeOption.id}
                          value={fuelTypeOption.id}
                        >
                          {fuelTypeOption.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.rangeSelectField}
                          fullWidth
                          label="Min Year"
                          name="minYear"
                          size="small"
                          onChange={handleMinYearChange}
                          select
                          SelectProps={{ native: true }}
                          value={filters.year || "all"}
                          variant="outlined"
                        >
                          {typeOptions.map((typeOption) => (
                            <option key={typeOption.id} value={typeOption.id}>
                              {typeOption.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.rangeSelectField}
                          fullWidth
                          label="Max Year"
                          name="maxYear"
                          size="small"
                          onChange={handleMaxYearChange}
                          select
                          SelectProps={{ native: true }}
                          value={filters.year || "all"}
                          variant="outlined"
                        >
                          {typeOptions.map((typeOption) => (
                            <option key={typeOption.id} value={typeOption.id}>
                              {typeOption.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.selectField}
                      fullWidth
                      label="Price"
                      name="price"
                      size="small"
                      onChange={handlePriceChange}
                      select
                      SelectProps={{ native: true }}
                      value={filters.price || "all"}
                      variant="outlined"
                    >
                      {typeOptions.map((typeOption) => (
                        <option key={typeOption.id} value={typeOption.id}>
                          {typeOption.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.rangeSelectField}
                          fullWidth
                          label="Min KM"
                          name="minKmDriven"
                          size="small"
                          onChange={handleMinKmDrivenChange}
                          select
                          SelectProps={{ native: true }}
                          value={filters.minKmDriven || "all"}
                          variant="outlined"
                        >
                          {typeOptions.map((typeOption) => (
                            <option key={typeOption.id} value={typeOption.id}>
                              {typeOption.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.rangeSelectField}
                          fullWidth
                          label="Max KM"
                          name="maxKmDriven"
                          size="small"
                          onChange={handleMaxKmDrivenChange}
                          select
                          SelectProps={{ native: true }}
                          value={filters.maxKmDriven || "all"}
                          variant="outlined"
                        >
                          {typeOptions.map((typeOption) => (
                            <option key={typeOption.id} value={typeOption.id}>
                              {typeOption.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.selectField}
                      fullWidth
                      label="Transmission"
                      name="transmission"
                      size="small"
                      onChange={handleTransmissionChange}
                      select
                      SelectProps={{ native: true }}
                      value={filters.transmission || "all"}
                      variant="outlined"
                    >
                      {typeOptions.map((typeOption) => (
                        <option key={typeOption.id} value={typeOption.id}>
                          {typeOption.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          {/* </CardContent>
        </Card> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Box mt={1}>
          <Header ads_type={ads_type} />
        </Box>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {paginatedAds.map((carAd) => (
              <Grid item key={carAd.id} xs={12} sm={6} md={3}>
                <MiniAd ad={carAd} />
              </Grid>
            ))}

            <Grid item lg={12} md={12} xs={12}>
              <Box>
                <TablePagination
                  component="div"
                  count={filteredAds.length}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[20, 40, 60]}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </main>
    </div>
  );
};

export default SideBar;
