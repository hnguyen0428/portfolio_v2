import React from 'react';
import PropTypes from 'prop-types';
import CSSColor from "../../../constants/CSSColor";
import CommonProps from "../../../common/props";

const stylePropType = require('react-style-proptype');


class Flexbox extends React.Component {
  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  onAnimationEnd = (e) => {
    if (this.props.onAnimationEnd) {
      this.props.onAnimationEnd(e);
    }
  };

  onTransitionEnd = (e) => {
    if (this.props.onTransitionEnd) {
      this.props.onTransitionEnd(e);
    }
  };

  render() {
    let style = {
      backgroundColor: this.props.backgroundColor,
      wordWrap: 'break-word',
    };
    if (this.props.hidden) {
      style = {...style, display: 'none'};
    }

    style = CommonProps.setFlexbox(style, this.props);
    style = CommonProps.setAlignments(style, this.props);
    style = CommonProps.setPaddings(style, this.props);
    style = CommonProps.setMargins(style, this.props);
    style = CommonProps.setDimensions(style, this.props);
    style = CommonProps.setBorders(style, this.props);

    if (this.props.href) {
      // Use <a> as a flexbox to make the whole box hyperlinked
      return (
        <a id={this.props.id} className={`hyperlink ${this.props.className}`}
           target={this.props.target} rel="noopener noreferrer"
           onClick={this.onClick}
           style={{...style, ...this.props.style}} href={this.props.href}>
          {this.props.children}
        </a>
      );
    }

    return (
      <div id={this.props.id} className={this.props.className}
           onClick={this.onClick} onAnimationEnd={this.onAnimationEnd}
           onTransitionEnd={this.onTransitionEnd}
           style={{...style, ...this.props.style}}>
        {this.props.children}
      </div>
    );
  }
}

Flexbox.propTypes = {
  id: PropTypes.string,
  ...CommonProps.flexbox,
  ...CommonProps.alignments,
  ...CommonProps.paddings,
  ...CommonProps.margins,
  ...CommonProps.dimensions,
  ...CommonProps.borders,
  ...CommonProps.links,

  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  className: PropTypes.string,

  ...CommonProps.style,
};


export default Flexbox;