import React from 'react';
import PropTypes from 'prop-types';

export default function ImgResponsive({ imageUrl, width, height, alt }) {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    objectFit: 'contain',
  };

  return <img src={imageUrl} alt={alt} style={style} />;
}

ImgResponsive.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
};
