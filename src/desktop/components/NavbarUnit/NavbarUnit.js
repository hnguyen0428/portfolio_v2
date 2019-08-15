import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import '../../../constants/common.css';
import Flexbox from '../Flexbox';
import Button from '../Button';
import Text from '../Text';
import CSSColor from "../../../constants/CSSColor";


class NavbarUnit extends React.Component {
  render() {
    let style = {};
    if (this.props.position === 'left') {
      style = {
        ...style,
        marginRight: 'auto'
      };
    }

    return (
      <Button {...this.props} style={style} color={CSSColor.WHITE}
              fontSize={15} paddingHorizontal={this.props.paddingHorizontal || 8}
              paddingVertical={this.props.paddingVertical}
              lineHeight={this.props.hasBorder ? 0.4 : undefined}
              allBorder={this.props.hasBorder}
              borderColor={this.props.borderColor}
              borderWidth={this.props.borderWidth}
              borderRadius={this.props.borderRadius}/>
    );
  }
}

NavbarUnit.propTypes = {
  label: PropTypes.string.isRequired,
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'bolder', 'lighter']),
  href: PropTypes.string,
  target: PropTypes.string,
  color: PropTypes.string,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,
  hasBorder: PropTypes.bool,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  logType: PropTypes.string,
  logClick: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
};


export default NavbarUnit;