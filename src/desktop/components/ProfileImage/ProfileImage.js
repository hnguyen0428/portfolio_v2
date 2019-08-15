import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import './style.css';


class ProfileImage extends React.Component {
  render() {

    let {src, alt, size, circular, href, target, onClick} = this.props;
    size = size || 256;
    return (
      <Image src={src} alt={alt} width={size} height={size} href={href}
             target={target} onClick={onClick}
             className={circular ? "circular" : null}/>
    );
  }
}

ProfileImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
  circular: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func
};


export default ProfileImage;