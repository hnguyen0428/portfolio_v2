import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import '../../../constants/common.css';
import Flexbox from '../Flexbox';
import Icon from '../Icon';
import CommonProps from "../../../common/props";


class NavbarUnitIcon extends React.Component {
  render() {
    let style = {};
    if (this.props.position === 'left') {
      style = {...style, marginRight: 'auto'};
    }

    style = CommonProps.setPaddings(style, this.props);

    return (
      <Flexbox onClick={this.props.onClick}
               style={style} alignItems="center" justifyContent="center">
        <Icon className="btnHover"
              href={this.props.href} target={this.props.target}
              src={this.props.src} size={this.props.size || 28}
              logDescription={this.props.logDescription}
              logClick={this.props.logClick}/>
      </Flexbox>
    );
  }
}

NavbarUnitIcon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf([16, 20, 24, 28, 32, 36, 40]),
  ...CommonProps.links,
  ...CommonProps.loggings,
  ...CommonProps.paddings,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
};


export default NavbarUnitIcon;