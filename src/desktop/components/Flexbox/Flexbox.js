import React from 'react';
import PropTypes from 'prop-types';
import CSSColor from "../../../constants/CSSColor";

const stylePropType = require('react-style-proptype');


class Flexbox extends React.Component {
  setPadding = (style) => {
    if (this.props.paddingAll) {
      style = {...style, paddingTop: this.props.paddingAll};
      style = {...style, paddingLeft: this.props.paddingAll};
      style = {...style, paddingBottom: this.props.paddingAll};
      style = {...style, paddingRight: this.props.paddingAll};
    }
    if (this.props.paddingVertical) {
      style = {...style, paddingTop: this.props.paddingVertical};
      style = {...style, paddingBottom: this.props.paddingVertical};
    }
    if (this.props.paddingHorizontal) {
      style = {...style, paddingLeft: this.props.paddingHorizontal};
      style = {...style, paddingRight: this.props.paddingHorizontal};
    }
    if (this.props.paddingTop) {
      style = {...style, paddingTop: this.props.paddingTop};
    }
    if (this.props.paddingLeft) {
      style = {...style, paddingLeft: this.props.paddingLeft};
    }
    if (this.props.paddingBottom) {
      style = {...style, paddingBottom: this.props.paddingBottom};
    }
    if (this.props.paddingRight) {
      style = {...style, paddingRight: this.props.paddingRight};
    }
    return style;
  };

  setMargin = (style) => {
    if (this.props.marginAll) {
      style = {...style, marginTop: this.props.marginAll};
      style = {...style, marginLeft: this.props.marginAll};
      style = {...style, marginBottom: this.props.marginAll};
      style = {...style, marginRight: this.props.marginAll};
    }
    if (this.props.marginVertical) {
      style = {...style, marginTop: this.props.marginVertical};
      style = {...style, marginBottom: this.props.marginVertical};
    }
    if (this.props.marginHorizontal) {
      style = {...style, marginLeft: this.props.marginHorizontal};
      style = {...style, marginRight: this.props.marginHorizontal};
    }
    if (this.props.marginTop) {
      style = {...style, marginTop: this.props.marginTop};
    }
    if (this.props.marginLeft) {
      style = {...style, marginLeft: this.props.marginLeft};
    }
    if (this.props.marginBottom) {
      style = {...style, marginBottom: this.props.marginBottom};
    }
    if (this.props.marginRight) {
      style = {...style, marginRight: this.props.marginRight};
    }
    if (this.props.autoMarginTop) {
      style = {...style, marginTop: 'auto'};
    }
    if (this.props.autoMarginLeft) {
      style = {...style, marginLeft: 'auto'};
    }
    if (this.props.autoMarginBottom) {
      style = {...style, marginBottom: 'auto'};
    }
    if (this.props.autoMarginRight) {
      style = {...style, marginRight: 'auto'};
    }
    return style;
  };

  setDimensions = (style) => {
    if (this.props.widthPct) {
      style = {...style, width: String(this.props.widthPct) + '%'};
    }
    if (this.props.width) {
      style = {...style, width: this.props.width};
    }
    if (this.props.heightPct) {
      style = {...style, height: String(this.props.heightPct) + '%'};
    }
    if (this.props.height) {
      style = {...style, height: this.props.height};
    }
    if (this.props.autoHeight) {
      style = {...style, height: 'auto'};
    }
    if (this.props.autoWidth) {
      style = {...style, width: 'auto'};
    }
    if (this.props.maxHeight) {
      style = {...style, maxHeight: this.props.maxHeight};
    }
    if (this.props.maxWidth) {
      style = {...style, maxWidth: this.props.maxWidth};
    }
    if (this.props.minHeight) {
      style = {...style, minHeight: this.props.minHeight};
    }
    if (this.props.minWidth) {
      style = {...style, minWidth: this.props.minWidth};
    }

    return style;
  };

  setBorders = (style) => {
    const {topBorder, leftBorder, bottomBorder, rightBorder, allBorder} = this.props;
    let hasBorder = topBorder || leftBorder || bottomBorder || rightBorder || allBorder;
    if (!hasBorder) {
      return style;
    }

    let borderColor = this.props.borderColor || CSSColor.GRAY_20;
    let borderWidth = this.props.borderWidth || 1;
    let borderRadius = this.props.borderRadius || 0;
    style = {
      ...style,
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderRadius: borderRadius,
    };
    if (topBorder) {
      style = {...style, borderTopStyle: 'solid'};
    }
    if (leftBorder) {
      style = {...style, borderLeftStyle: 'solid'};
    }
    if (bottomBorder) {
      style = {...style, borderBottomStyle: 'solid'};
    }
    if (rightBorder) {
      style = {...style, borderRightStyle: 'solid'};
    }
    if (allBorder) {
      style = {...style, borderStyle: 'solid'};
    }
    return style;
  };

  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    let style = {
      display: 'flex',
      flexDirection: this.props.flexDirection || 'column',
      flexWrap: this.props.flexWrap || 'nowrap',
      flexGrow: this.props.flexGrow || 0,
      flexShrink: this.props.flexShrink || 1,
      flexBasis: this.props.flexBasis || 'auto',
      justifyContent: this.props.justifyContent || 'flex-start',
      alignSelf: this.props.alignSelf || 'auto',
      alignItems: this.props.alignItems || 'flex-start',
      backgroundColor: this.props.backgroundColor,
      wordWrap: 'break-word',
    };
    if (this.props.hidden) {
      style = {...style, display: 'none'};
    }

    style = this.setPadding(style);
    style = this.setMargin(style);
    style = this.setDimensions(style);
    style = this.setBorders(style);

    if (this.props.href) {
      // Use <a> as a flexbox to make the whole box hyperlinked
      return (
        <a className={`hyperlink ${this.props.className}`}
           target={this.props.target} rel="noopener noreferrer"
           onClick={this.onClick}
           style={{...style, ...this.props.style}} href={this.props.href}>
          {this.props.children}
        </a>
      );
    }

    return (
      <div className={this.props.className} onClick={this.onClick}
           style={{...style, ...this.props.style}}>
        {this.props.children}
      </div>
    );
  }
}

Flexbox.propTypes = {
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexBasis: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
  alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),

  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingAll: PropTypes.number,

  marginVertical: PropTypes.number,
  marginHorizontal: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginAll: PropTypes.number,
  autoMarginTop: PropTypes.bool,
  autoMarginLeft: PropTypes.bool,
  autoMarginBottom: PropTypes.bool,
  autoMarginRight: PropTypes.bool,

  width: PropTypes.number,
  height: PropTypes.number,
  widthPct: PropTypes.number,
  heightPct: PropTypes.number,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  autoHeight: PropTypes.bool,
  autoWidth: PropTypes.bool,

  borderColor: PropTypes.string,
  borderWidth: PropTypes.string,
  borderRadius: PropTypes.number,
  topBorder: PropTypes.bool,
  leftBorder: PropTypes.bool,
  bottomBorder: PropTypes.bool,
  rightBorder: PropTypes.bool,
  allBorder: PropTypes.bool,

  href: PropTypes.string,
  target: PropTypes.string,
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  style: stylePropType,
  className: PropTypes.string
};


export default Flexbox;