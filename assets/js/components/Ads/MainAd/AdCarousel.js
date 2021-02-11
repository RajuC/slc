// https://www.npmjs.com/package/react-responsive-carousel

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./AdCorousel.css";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core";

// var React = require('react');
// var ReactDOM = require('react-dom');
// var Carousel = require('react-responsive-carousel').Carousel;

const useStyles = makeStyles((theme) => ({
  root: {},
  MobileImgSlide: {
    marginTop: "20%",
  },
  doubleWidth: {},
  widthGTHeight: {},
  heightGTWidth: {},
  carouselImg: {
    // maxWidth:
    height: 900,
  },
}));

const AdCarousel = ({ imagesList }) => {
  const classes = useStyles();
  console.log("(AdCorousel)========================== imagesList", imagesList);
  return (
    <div className="carousel-wrapper">
      <Carousel
        infiniteLoop
        useKeyboardArrows
        showArrows={true}
        // width="100%"
      >
        {imagesList &&
          imagesList.map((imageObject) => (
            <div key={imageObject.name}>
              <img
                style={{
                  marginTop:
                  imageObject.width >= 2.5 * imageObject.height
                      ? "6%"
                      : imageObject.width >= 2 * imageObject.height
                      ? "5%"
                      : imageObject.width > 1.5 * imageObject.height
                      ? "3%"
                      : imageObject.width > imageObject.height
                      ? "2%"
                      : "1%",

                  maxWidth:
                    imageObject.width >= 2 * imageObject.height
                      ? "90%"
                      : imageObject.width > 1.5 * imageObject.height
                      ? "80%"
                      : imageObject.width > imageObject.height
                      ? "60%"
                      : imageObject.height >= 2 * imageObject.width
                      ? "30%"
                      : imageObject.height >= 1.5 * imageObject.width
                      ? "36%"
                      : "37%"
                }}
                src={imageObject.url}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default AdCarousel;
