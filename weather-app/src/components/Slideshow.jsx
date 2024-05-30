// Slideshow.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
  slideContainer: {
    width: '100%',
    height: '100vh',
  },
}));

const Slideshow = () => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    'https://source.unsplash.com/1600x900/?lightning',
    'https://source.unsplash.com/1600x900/?raining',
    'https://source.unsplash.com/1600x900/?desert',
    'https://source.unsplash.com/1600x900/?climatechanges',
    'https://source.unsplash.com/1600x900/?storm',
  ];

  return (
    <Slider {...settings} className={classes.slideContainer}>
      {images.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Slide ${index}`} className={classes.slideImage} />
        </div>
      ))}
    </Slider>
  );
};

export default Slideshow;
