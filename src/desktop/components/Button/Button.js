import React from 'react';
import PropTypes from 'prop-types';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import Text from "../../components/Text";
import './style.css';
import CommonProps from "../../common/props";

const stylePropType = require('react-style-proptype');

class Button extends React.Component {
  onClick = (e) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const {
      fontSize,
      fontWeight,
      label,
      lineHeight,
      href,
      target,
      style,
      paddingVertical,
      paddingHorizontal,
      borderRadius,
      borderColor,
      borderWidth,
      topBorder,
      leftBorder,
      bottomBorder,
      rightBorder,
      allBorder,
      backgroundColor,
      color,
      logDescription,
      logClick,
      disabled,
      disabledBackgroundColor,
      disabledColor,
      disabledBorderColor,
    } = this.props;
    let textColorStyle = {
      color: (disabled ? disabledColor : color) || CSSColor.GRAY_100
    };

    return (
      <Flexbox className="btnHover cursorPointer"
               href={disabled ? null : href}
               target={target}
               onClick={this.onClick}
               style={style}
               paddingVertical={paddingVertical}
               paddingHorizontal={paddingHorizontal}
               borderRadius={borderRadius}
               borderColor={disabled ? disabledBorderColor : borderColor}
               borderWidth={borderWidth}
               topBorder={topBorder}
               leftBorder={leftBorder}
               bottomBorder={bottomBorder}
               rightBorder={rightBorder}
               allBorder={allBorder}
               backgroundColor={disabled ? disabledBackgroundColor : backgroundColor}>
        <Text className="unselectable"
              fontSize={fontSize || 12}
              fontWeight={fontWeight || 300}
              href={disabled ? null : href} target={disabled ? null : target}
              logClick={!disabled && logClick} lineHeight={lineHeight}
              logDescription={logDescription} style={textColorStyle}
              buttonFont>
          {label}
        </Text>
      </Flexbox>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,

  ...CommonProps.text,
  ...CommonProps.links,
  ...CommonProps.paddings,
  ...CommonProps.borders,
  ...CommonProps.loggings,

  onClick: PropTypes.func,

  // Disabled props
  disabled: PropTypes.bool,
  disabledColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
  disabledBorderColor: PropTypes.string,
  ...CommonProps.style,

};

export default Button;