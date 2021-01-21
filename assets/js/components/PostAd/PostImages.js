import React, { useState } from "react";
import { DropzoneAreaBase } from "material-ui-dropzone";

// const { promisify } = require('util');
// const fs = require('fs');
// const convert = require('heic-convert');

import {
  makeStyles,
  Container,
  Button,
  IconButton,
  CloseIcon,
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
} from "@material-ui/core";
import _ from "lodash";

import PostHeader from "./PostHeader";
// import storage from "../Firebase/index";
import storage from "../../helpers/firebase";
import { useDispatch, useSelector } from "react-redux";
import { postAdActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {
    backgroundColor: "white",
  },
  cardGrid: {
    marginTop: 20,
  },
  dropzone: {
    paddingRight: "10%",
    marginTop: "5%",
    backgroundColor: "green",
    // maxWidth:"md"
  },
  preview: {
    backgroundColor: "red",
    spacing: theme.spacing(1),
  },
  submit: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const valObj = {
  value: "",
  error: false,
  errorText: "upload atleast 3-4 pictures",
};

const PostImages = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({ progress: 0 });
  const PostId = useSelector((state) => state.postAd.details.post_ad_id);
  const images = useSelector((state) => state.postAd.details.images);

  const updateValObjWithError = (errorText) => {
    return {
      ...valObj,
      value: "",
      error: true,
      errorText: errorText,
    };
  };

  const handleUpload = (image) => {
    console.log("(handleUpload)========================== image", image.type );
    let img = new Image();
    var width, height;
    img.src = window.URL.createObjectURL(image);
    img.onload = () => {
      width = img.width;
      height = img.height;
    };
    // const { image } = this.state;
    return new Promise(function (resolve, reject) {
      let imageName = `images/${PostId}-${image.name}`;
      let ImageNameRef = storage.ref(imageName);
      const uploadTask = ImageNameRef.put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress({ progress });
        },
        (error) => {
          // Error function ...
          console.log(error);
          reject(error);
        },
        () => {
          // complete function ...
          ImageNameRef.getDownloadURL().then((imageUrl) => {
            resolve({
              url: imageUrl,
              name: image.name,
              imgRef: imageName,
              width: width,
              height: height,
            });
            console.log("Image Url-------------------------", imageUrl);
            // this.setState({ url });
            // setImageUrls([...imageUrls, {url: imageUrl, name: image.name}]);
          });
        }
      );
    });
  };

  const handleAddImageDispatch = (imageUrls) => {
    let vechicleImages = "";
    if (images.length === 0 && !images.value) {
      vechicleImages = {
        ...valObj,
        value: imageUrls,
      };
    } else {
      _.merge(images.value, [...images.value, ...imageUrls]);
      vechicleImages = images;
    }
    dispatch(postAdActions.addVehicleImages(vechicleImages));
  };

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    Promise.all(
      newFiles.map((file) => handleUpload(file.file))
    ).then((imageUrls) => handleAddImageDispatch(imageUrls));
    setFiles([...files, ...newFiles]);
  };


  const handleDeleteImageDispatch = (ImageNameRef) => {
    let vechicleImages = {
        ...valObj,
        value: images.value.filter(
            (f) => f.imgRef !== ImageNameRef
        )
      };
      if (vechicleImages.value.length === 0) {
        vechicleImages = 
          updateValObjWithError(
            `Make sure the vehicle images are uploaded!`
          )
      }
    dispatch(postAdActions.addVehicleImages(vechicleImages));
  }


  const handleDelete = (fileToBeDeleted) => {
    setFiles(files.filter((f) => f !== fileToBeDeleted));
    let ImageNameRef = `images/${PostId}-${fileToBeDeleted.file.name}`;
    let delImageNameRef = storage.ref(ImageNameRef);
    delImageNameRef
      .delete()
      .then(() => {
        console.log(
          "(imageNameRef deleted file)==========================deleted succesfully ",
          ImageNameRef
        );
        handleDeleteImageDispatch(ImageNameRef)
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <PostHeader title="Upload Vehicle Images" />
      <Card className={classes.cardContent}>
        <CardContent className={classes.cardContent}>
          <DropzoneAreaBase
            className={classes.dropzone}
            filesLimit={10}
            maxFileSize={10000000}
            fileObjects={files}
            // acceptedFiles={['image/*', 'image/HEIC', 'image']}
            acceptedFiles={['image/jpeg', 'image/jpg', 'image/png', , 'image/heic' ]}
            onAdd={handleAdd}
            onDelete={handleDelete}
            previewGridClasses={{ container: classes.dropzone }}
            // previewGridProps={{ container: classes.preview }}
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-start" p={2}>
          {images && images.error && (
            <Typography variant="button" display="block" color="error">
              *** {images.errorText}
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default PostImages;
