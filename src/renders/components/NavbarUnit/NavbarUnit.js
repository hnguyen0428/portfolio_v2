import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import '../../../constants/common.css';
import Button from '../Button';
import CSSColor from "../../../constants/CSSColor";
import CommonProps from "../../../common/props";
import {coalesce} from "../../../common/utils";


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
      <Button {...this.props} style={style}
              paddingHorizontal={coalesce(this.props.paddingHorizontal, 8)}
              paddingVertical={this.props.paddingVertical}
              lineHeight={this.props.allBorder ? 0.4 : (this.props.lineHeight)}
              fontSize={this.props.fontSize || 15}
              fontWeight={this.props.fontWeight}
              color={this.props.color || CSSColor.WHITE}
              borderColor={this.props.borderColor}
              borderWidth={this.props.borderWidth}
              borderRadius={this.props.borderRadius}/>
    );
  }
}

NavbarUnit.propTypes = {
  label: PropTypes.string.isRequired,
  ...CommonProps.text,
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