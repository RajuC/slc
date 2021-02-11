import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import CustomButton from "../Layouts/CustomButton";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function DisplayImages({ imagesList, onImageDel }) {
  const classes = useStyles();

  // console.log("(fileName)========================== ", imagesList);
  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center" spacing={3}>
        {imagesList.map((image) => (
          <Grid item lg={2} md={3} xs={4} key={image.imgRef}>
            <>
              <Image src={image.url} />
              <CustomButton
                color="primary"
                variant="contained"
                size="small"
                fullWidth
                onClick={() => {
                    onImageDel(image);
                  }}
              >
                Delete
              </CustomButton>
            </>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const itemData = [
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9501679f4d-WhatsApp%20Image%202021-01-12%20at%207.51.39%20PM%20(1).jpeg?alt=media&token=ed28b5df-4506-4206-a1a2-5b380f8ea557",
    imgRef: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9501679f4d-WhatsApp%20Image%202021-01-12%20at%207.51.40%20PM.jpeg?alt=media&token=31810dae-f16e-4630-bb8c-ce73efae8e59",
    imgRef: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-1.jpg?alt=media&token=09359009-4c88-4b84-a1a1-d87cb02c36a1",
    imgRef: "Camera",
    author: "@helloimnik",
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-2.jpg?alt=media&token=8c784642-eae9-4a66-a48f-1ad9ef478b39",
    imgRef: "Coffee",
    author: "@nolanissac",
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/srilaxmi-cars.appspot.com/o/images%2F2277-9670202e80-3.jpg?alt=media&token=4ee9fb35-ba60-48b2-a8e3-f774e2087c0e",
    imgRef: "Hats",
    author: "@hjrc33",
  },
  {
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    imgRef: "Honey",
    author: "@arwinneil",
  },
  {
    url: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    imgRef: "Basketball",
    author: "@tjdragotta",
  },
  {
    url: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    imgRef: "Fern",
    author: "@katie_wasserman",
  },
  {
    url: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    imgRef: "Mushrooms",
    author: "@silverdalex",
  },
  {
    url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    imgRef: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    url: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    imgRef: "Sea star",
    author: "@peterlaster",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    imgRef: "Bike",
    author: "@southside_customs",
  },
];
