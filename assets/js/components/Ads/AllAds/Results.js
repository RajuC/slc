import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import numeral from "numeral";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Tooltip,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CustomButton from "../../Layouts/CustomButton";
// import { Alert } from "@material-ui/lab";

import {
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon,
} from "react-feather";
import Label from "../../Layouts/Label";

// const Button = withStyles((theme) => ({
//   root: {
//     // color: "#153e4d",
//     backgroundColor: "#153e4d",
//     "&:hover": {
//       backgroundColor: "#169f36",
//     },
//   },
// }))(Button);

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

const statusOptions = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "active",
    name: "Active",
  },
  {
    id: "inactive",
    name: "InActive",
  },
  {
    id: "under_review",
    name: "Under Review",
  },
  {
    id: "sold",
    name: "Sold",
  },
];

const sortOptions = [
  {
    value: "updatedAt|desc",
    label: "Last update (newest first)",
  },
  {
    value: "updatedAt|asc",
    label: "Last update (oldest first)",
  },
  {
    value: "createdAt|desc",
    label: "Creation date (newest first)",
  },
  {
    value: "createdAt|asc",
    label: "Creation date (oldest first)",
  },
];

const getStatusLabel = (ad_status) => {
  const map = {
    Active: {
      text: "Active",
      color: "success",
    },
    Inactive: {
      text: "InActive",
      color: "error",
    },
    "Under Review": {
      text: "Under Review",
      color: "warning",
    },
    Sold: {
      text: "Sold",
      color: "warning",
    },
  };

  const { text, color } = map[ad_status];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (ads, nameQuery, idQuery, filters) => {
  return ads.filter((ad) => {
    let matches = true;

    if (idQuery && !ad.id.toString().includes(idQuery.toString())) {
      matches = false;
    }

    if (nameQuery && !ad.name.toLowerCase().includes(nameQuery.toLowerCase())) {
      matches = false;
    }

    if (filters.type && ad.type !== filters.type) {
      matches = false;
    }

    if (filters.status && ad.ad_status !== filters.status) {
      matches = false;
    }

    if (filters.fuelType && ad.fuel_type !== filters.fuelType) {
      matches = false;
    }

    if (filters.activeAds && !ad.is_ad_active) {
      matches = false;
    }
    if (filters.inactiveAds && ad.is_ad_active) {
      matches = false;
    }

    if (filters.slcAds && ad.post_by !== "slc") {
      matches = false;
    }

    if (filters.nonSlcAds && ad.post_by !== "non_slc") {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (ads, page, limit) => {
  return ads.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles((theme) => ({
  root: {},
  bulkOperations: {
    position: "relative",
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: "absolute",
    width: "100%",
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  queryField: {
    // width: 500,
    flexBasis: 300,
    marginRight: theme.spacing(2),
  },
  typeField: {
    flexBasis: 200,
  },
  statusField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200,
  },
  fuelTypeField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200,
  },
  activeAdsField: {
    marginLeft: theme.spacing(2),
  },
  inActiveAdsField: {
    marginLeft: theme.spacing(2),
  },
  slcAdsField: {
    marginLeft: theme.spacing(2),
  },
  nonSlcAdsField: {
    marginLeft: theme.spacing(2),
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0,
  },
  image: {
    height: 68,
    width: 68,
  },
}));

const Results = ({ className, ads, ...rest }) => {
  console.log("(Results)========================== ads", ads);
  const classes = useStyles();
  const [selectedAds, setSelectedAds] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [idQuery, setIdQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    type: null,
    status: null,
    fuelType: null,
    activeAds: null,
    inActiveAds: null,
    slcAds: null,
    nonSlcAds: null,
  });

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNameQueryChange = (event) => {
    event.persist();
    setNameQuery(event.target.value);
  };

  const handleIdQueryChange = (event) => {
    event.persist();
    setIdQuery(event.target.value);
  };

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

  const handleStatusChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
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

  const handleActiveAdsChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      activeAds: value,
    }));
  };

  const handleInActiveAdsChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      inActiveAds: value,
    }));
  };

  const handleSlcAdsChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      slcAds: value,
    }));
  };

  const handleNonSlcAdsChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.checked) {
      value = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      nonSlcAds: value,
    }));
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllAds = (event) => {
    setSelectedAds(event.target.checked ? ads.map((ad) => ad.id) : []);
  };

  const handleSelectOneAd = (event, adId) => {
    if (!selectedAds.includes(adId)) {
      setSelectedAds((prevSelected) => [...prevSelected, adId]);
    } else {
      setSelectedAds((prevSelected) =>
        prevSelected.filter((id) => id !== adId)
      );
    }
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

  const handleAdDelete = (ad_id) => {
    setOpen(false);
    console.log(
      "(Results)========================== handleAdDelete ad_id",
      ad_id
    );
  };

  // Usually query is done on backend with indexing solutions
  const filteredAds = applyFilters(ads, nameQuery, idQuery, filters);
  const paginatedAds = applyPagination(filteredAds, page, limit);
  const enableBulkOperations = selectedAds.length > 0;
  const selectedSomeAds =
    selectedAds.length > 0 && selectedAds.length < ads.length;
  const selectedAllAds = selectedAds.length === ads.length;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <TextField
            className={classes.queryField}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            onChange={handleIdQueryChange}
            placeholder="Search Ad By Id"
            value={idQuery}
            variant="outlined"
          />
          <TextField
            className={classes.queryField}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            onChange={handleNameQueryChange}
            placeholder="Search Ad By Name"
            value={nameQuery}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            label="Sort By"
            name="sort"
            size="small"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={3} display="flex" alignItems="center">
          {/* <TextField
            className={classes.typeField}
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
          </TextField> */}
          <TextField
            className={classes.statusField}
            label="Status"
            name="status"
            size="small"
            onChange={handleStatusChange}
            select
            SelectProps={{ native: true }}
            value={filters.status || "all"}
            variant="outlined"
          >
            {statusOptions.map((statusOption) => (
              <option key={statusOption.id} value={statusOption.id}>
                {statusOption.name}
              </option>
            ))}
          </TextField>
          <TextField
            className={classes.fuelTypeField}
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
              <option key={fuelTypeOption.id} value={fuelTypeOption.id}>
                {fuelTypeOption.name}
              </option>
            ))}
          </TextField>
          <FormControlLabel
            className={classes.slcAdsField}
            control={
              <Checkbox
                checked={!!filters.slcAds}
                onChange={handleSlcAdsChange}
                name="slcAds"
              />
            }
            label="Slc Ads"
          />
          <FormControlLabel
            className={classes.nonSlcAdsField}
            control={
              <Checkbox
                checked={!!filters.nonSlcAds}
                onChange={handleNonSlcAdsChange}
                name="nonSlcAds"
              />
            }
            label="Non Slc Ads"
          />
          <FormControlLabel
            className={classes.activeAdsField}
            control={
              <Checkbox
                checked={!!filters.activeAds}
                onChange={handleActiveAdsChange}
                name="activeAds"
              />
            }
            label="Active Ads"
          />
          <FormControlLabel
            className={classes.inActiveAdsField}
            control={
              <Checkbox
                checked={!!filters.inActiveAds}
                onChange={handleInActiveAdsChange}
                name="inActiveAds"
              />
            }
            label="InActive Ads"
          />
        </Box>
      </Box>
      {/* {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllAds}
              indeterminate={selectedSomeAds}
              onChange={handleSelectAllAds}
            />
            <CustomButton
              component={RouterLink}
              to={`/listing/delete`}
              className={classes.bulkAction}
              startIcon={<DeleteIcon />}
            >
              Delete
            </CustomButton>
          </div>
        </div>
      )} */}
      <PerfectScrollbar>
        <Box minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllAds}
                    indeterminate={selectedSomeAds}
                    onChange={handleSelectAllAds}
                  />
                </TableCell> */}
                <TableCell>AdId</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>FuelType</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Km Driven</TableCell>
                <TableCell>TimeStamp</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAds.map((ad) => {
                const isAdSelected = selectedAds.includes(ad.id);
                console.log("(Results ad)========================== ", ad);

                return (
                  <TableRow hover key={ad.id} selected={isAdSelected}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isAdSelected}
                        onChange={(event) => handleSelectOneAd(event, ad.id)}
                        value={isAdSelected}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Link
                        variant="body2"
                        color="textPrimary"
                        component={RouterLink}
                        underline="hover"
                        // to={{ pathname: `/listing/${ad.id}/view`, state: { basicDetails: ad } }}
                        to={`/listing/${ad.id}/view`}
                      >
                        <Label color="success">{ad.id}</Label>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={ad.name}>
                        <Link
                          variant="body2"
                          color="textPrimary"
                          component={RouterLink}
                          underline="always"
                          size="small"
                          // to={{ pathname: `/listing/${ad.id}/view`, state: { basicDetails: ad } }}
                          to={`/listing/${ad.id}/view`}
                        >
                          {ad.name.slice(0, 15) + "..."}
                        </Link>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{ad.fuel_type}</TableCell>
                    <TableCell>
                      {"Rs " +
                        numeral(ad.asking_price).format(`0,0.00`) +
                        " /-"}
                    </TableCell>
                    <TableCell>{ad.year}</TableCell>
                    <TableCell>{ad.km_driven}</TableCell>
                    <TableCell>{ad.inserted_at}</TableCell>
                    <TableCell>{getStatusLabel(ad.ad_status)}</TableCell>
                    <TableCell align="left">
                      {/* <CustomButton
                        className={classes.bulkAction}
                        href={`/listing/${ad.id}/view`}
                      >
                        View
                      </CustomButton> */}
                      <CustomButton
                        className={classes.bulkAction}
                        href={`/listing/${ad.id}/edit`}
                      >
                        Edit
                      </CustomButton>
                      <CustomButton
                        className={classes.bulkAction}
                        onClick={() => {
                          handleClickOpen();
                        }}
                      >
                        Del
                      </CustomButton>
                      <Dialog
                        fullScreen={fullScreen}
                        BackdropProps={{
                          style: { backgroundColor: "transparent" },
                        }}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Delete Ad"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this AD?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            autoFocus
                            onClick={() => {
                              handleClose();
                            }}
                            // onClick={handleClose}
                            color="secondary"
                          >
                            No
                          </Button>
                          <Button
                            onClick={() => {
                              handleAdDelete(ad.id);
                            }}
                            // onClick={handleAdDelete(ad.id)}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredAds.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  ads: PropTypes.array.isRequired,
};

Results.defaultProps = {
  ads: [],
};

export default Results;
