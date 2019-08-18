import React from 'react';
import PropTypes from 'prop-types';
import Logger from '../../../firebase/logger';
import './style.css';
import Image from "../Image";
import CommonProps from "../../../common/props";


class Icon extends React.Component {
  render() {
    let size = this.props.size || 32;

    return (
      <Image {...this.props} width={size} height={size}/>
    );
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf([16, 20, 24, 28, 32, 36, 40]),
  ...CommonProps.links,
  ...CommonProps.loggings,
  onClick: PropTypes.func
};


export default Icon;