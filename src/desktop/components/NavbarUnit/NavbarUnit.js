import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import '../../../constants/common.css';
import Flexbox from '../Flexbox';
import Button from '../Button';
import Text from '../Text';
import CSSColor from "../../../constants/CSSColor";
import CommonProps from "../../common/props";


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
              lineHeight={this.props.allBorder ? 0.4 : undefined}
              borderColor={this.props.borderColor}
              borderWidth={this.props.borderWidth}
              borderRadius={this.props.borderRadius}/>
    );
  }
}

NavbarUnit.propTypes = {
  label: PropTypes.string.isRequired,
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'bolder', 'lighter']),
  ...CommonProps.links,
  ...CommonProps.borders,

  color: PropTypes.string,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,

  ...CommonProps.loggings,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
};


export default NavbarUnit;