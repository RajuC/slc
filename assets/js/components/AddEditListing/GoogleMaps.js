import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { useDispatch, useSelector } from "react-redux";

import { adUtilsService } from "../../services/adUtilsService";

import { postAdActions } from "../../actions";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const mandatoryText =
  " field cannot be empty - Enter Location - only Alphabets!";
// const valObj = {
//   value: "",
//   error: false,
//   errorText: "only alphabets - ex: malkajgiri, secunderabad",
// };

// export default function GoogleMaps() {
const GoogleMaps = ({ field, locListing, onLocationFieldChange }) => {
  // console.log("(GoogleMaps)========================== GoogleMaps", locListing );
  const classes = useStyles();
  // const [carLocation, setCarLocation] = React.useState(valObj);
  const [value, setValue] = React.useState(null);
  // const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  const dispatch = useDispatch();
  const postAd = useSelector((state) => state.postAd.details);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA-SvePR8DwM531CEbfJAipwszxCJwdvXk&libraries=places",
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }
  const searchOptions = {
    types: ["(regions)"],
    // types: ['(cities)'],
    componentRestrictions: { country: "in" },
  };

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        // console.log("--------------request..", request);
        autocompleteService.current.getPlacePredictions(
          { ...request, ...searchOptions },
          callback
        );
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    // if (inputValue === '') {
    //   setOptions(value ? [value] : []);
    //   return undefined;
    // }

    if (locListing.value.location === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: locListing.value.location }, (results) => {
      // console.log("fetch ------------- carLocation.value ", locListing.value.location, "and results : ", results);
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        // console.log(" fetch --------------- newOptions", newOptions);
        setOptions(newOptions);
      }
    });
  // console.log("(fileName)========================== ", param );

    return () => {
      active = false;
    };
  }, [value, locListing.value.location, fetch]);



  const handleChange = (loc) => {
    var re = /^[a-zA-Z]*$/;
    let locDetailsObj = "";
    if (!loc) {
      // setCarLocation(
      //   updateValObjWithError(`${locListing.label} ${mandatoryText}!`)
      // );
      locDetailsObj = adUtilsService.updateValObjWithError(
        field,
        `${locListing.label} ${mandatoryText}!`
      );
      // dispatch(postAdActions.addVehicleLocation(
      //   updateValObjWithError(`${label} ${mandatoryText}!`)
      // ));
      // return undefined
    } else if (!re.test(loc)) {
      locDetailsObj = adUtilsService.updateValObjWithError(
        field,
        `Enter a Valid Location - only Alphabets!`
      );
      // setCarLocation(
      //   updateValObjWithError(`Enter a Valid Location - only Alphabets!`)
      // );
      // dispatch(postAdActions.addVehicleLocation(
      //   updateValObjWithError(`Enter a Valid Location - only Alphabets!`)
      // ));
      // return undefined
    } else {
          //       let locDetailsObj = adUtilsService.updateValObjWithVal(
          //   field,
          //   {location: newValue.description, place_id: ""}
          // );
          // onLocationFieldChange(locDetailsObj);

      locDetailsObj = adUtilsService.updateValObjWithVal(field, {location: loc, place_id: ""});
      // setCarLocation(updateValObjWithVal(loc));
    }

    onLocationFieldChange(locDetailsObj);
  };

  return (
    <Autocomplete
      id="google-map-kars-region"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      // noOptionsText={'Enter Location or Zipcode'}
      options={options}
      autoComplete
      freeSolo
      includeInputInList
      filterSelectedOptions
      value={locListing.value.location}
      onChange={(event, newValue) => {
        // console.log("location selected ........", newValue);
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if (newValue && newValue.description) {
          // setCarLocation(updateValObjWithVal(newValue.description));
          let locDetailsObj = adUtilsService.updateValObjWithVal(
            field,
            {location: newValue.description, place_id:  newValue.place_id}
          );
          onLocationFieldChange(locDetailsObj);
          // dispatch(postAdActions.addVehicleLocation(
          //   updateValObjWithVal(newValue.description)
          // ));
        }
      }}
      onInputChange={(event, newInputValue) => {
        // console.log("entered InputValue........", newInputValue);
        handleChange(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter Location"
          variant="outlined"
          error={locListing.error}
          helperText={locListing.errorText}
          fullWidth
          required
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 500 : 200 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default GoogleMaps;
