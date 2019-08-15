import React from 'react';
import PropTypes from 'prop-types';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import Text from "../../components/Text";
import './style.css';

const stylePropType = require('react-style-proptype');

class Button extends React.Component {
  render() {
    let textColorStyle = {
      color: this.props.color || CSSColor.GRAY_100
    };

    return (
      <Flexbox className="btnHover cursorPointer"
               href={this.props.href}
               target={this.props.target}
               onClick={this.props.onClick}
               style={this.props.style}
               paddingVertical={this.props.paddingVertical}
               paddingHorizontal={this.props.paddingHorizontal}
               borderRadius={this.props.borderRadius}
               borderColor={this.props.borderColor}
               borderWidth={this.props.borderWidth}
               topBorder={this.props.topBorder}
               leftBorder={this.props.leftBorder}
               bottomBorder={this.props.bottomBorder}
               rightBorder={this.props.rightBorder}
               allBorder={this.props.allBorder}
               backgroundColor={this.props.backgroundColor}>
        <Text className="unselectable"
              size={this.props.fontSize || 12}
              weight={this.props.fontWeight || 300}
              href={this.props.href} target={this.props.target}
              logClick={this.props.logClick} lineHeight={this.props.lineHeight}
              logDescription={this.props.logDescription} style={textColorStyle}
              buttonFont>
          {this.props.label}
        </Text>
      </Flexbox>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'bolder', 'lighter']),
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  href: PropTypes.string,
  target: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.string,
  topBorder: PropTypes.bool,
  leftBorder: PropTypes.bool,
  bottomBorder: PropTypes.bool,
  rightBorder: PropTypes.bool,
  allBorder: PropTypes.bool,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,
  logDescription: PropTypes.string,
  logClick: PropTypes.bool,
  onClick: PropTypes.func,
  style: stylePropType,

};

export default Button;