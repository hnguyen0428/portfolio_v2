import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import '../../../constants/common.css';
import Flexbox from '../Flexbox';
import Icon from '../Icon';


class NavbarUnitIcon extends React.Component {
  render() {
    let style = {};
    if (this.props.position === 'left') {
      style = {...style, marginRight: 'auto'};
    }

    return (
      <Flexbox className="navbarUnitIcon" onClick={this.props.onClick}
               style={style} alignItems="center" justifyContent="center">
        <Icon className="btnHover"
              href={this.props.href} target={this.props.target}
              src={this.props.src} size={28}
              logDescription={this.props.logType}
              logClick={this.props.logClick}/>
      </Flexbox>
    );
  }
}

NavbarUnitIcon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf([16, 20, 24, 28, 32, 36, 40]),
  href: PropTypes.string,
  target: PropTypes.string,
  logDescription: PropTypes.string,
  logClick: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
};


export default NavbarUnitIcon;