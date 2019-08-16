import React from 'react';
import PropTypes from 'prop-types';
import CSSColor from "../../../constants/CSSColor";
import CommonProps from "../../common/props";

const stylePropType = require('react-style-proptype');


class Flexbox extends React.Component {
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

    style = CommonProps.setPaddings(style, this.props);
    style = CommonProps.setMargins(style, this.props);
    style = CommonProps.setDimensions(style, this.props);
    style = CommonProps.setBorders(style, this.props);

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

  ...CommonProps.alignments,
  ...CommonProps.paddings,
  ...CommonProps.margins,
  ...CommonProps.dimensions,
  ...CommonProps.borders,
  ...CommonProps.links,

  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,

  ...CommonProps.style,
};


export default Flexbox;