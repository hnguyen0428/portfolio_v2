import React from 'react';
import PropTypes from 'prop-types';
import Logger from '../../../firebase/logger';
import './style.css';
import CSSColor from "../../../constants/CSSColor";
import CommonProps from "../../../common/props";

const stylePropType = require('react-style-proptype');


class Text extends React.Component {
  onClick = () => {
    if (!this.props.logClick || !this.props.href) {
      return;
    }

    let logData = {
      action: 'visit_href',
      href: this.props.href,
    };
    if (this.props.logDescription) {
      logData = {...logData, description: this.props.logDescription};
    }
    if (this.props.logExtra) {
      logData = {...logData, extra: this.props.logExtra};
    }

    // If there is an href, then log
    Logger.genLog(logData);
  };

  render() {
    let style = {};
    style = CommonProps.setTextStyleOrDefault(style, this.props);
    style = {...style, ...this.props.style};

    let cls = [this.props.className, "text"];
    if (this.props.buttonFont) {
      cls.push("btnFont");
    } else {
      cls.push("stdFont");
    }
    cls = cls.join(' ');

    let headingComponent = null;
    switch (this.props.heading) {
      case 1:
        headingComponent = (
          <h1 className={cls}>
            <a href={this.props.href} className="hyperlink"
               target={this.props.target} onClick={this.onClick}>
              {this.props.children}
            </a>
          </h1>
        );
        break;
      case 2:
        headingComponent = (
          <h2 className={cls}>
            <a href={this.props.href} className="hyperlink"
               target={this.props.target} onClick={this.onClick}>
              {this.props.children}
            </a>
          </h2>
        );
        break;
      case 3:
        headingComponent = (
          <h3 className={cls}>
            <a href={this.props.href} className="hyperlink"
               target={this.props.target} onClick={this.onClick}>
              {this.props.children}
            </a>
          </h3>
        );
        break;
      case 4:
        headingComponent = (
          <h4 className={cls}>
            <a href={this.props.href} className="hyperlink"
               target={this.props.target} onClick={this.onClick}>
              {this.props.children}
            </a>
          </h4>
        );
        break;
      case 5:
        headingComponent = (
          <h5 className={cls}>
            <a href={this.props.href} className="hyperlink"
               target={this.props.target} onClick={this.onClick}>
              {this.props.children}
            </a>
          </h5>
        );
        break;
      case 6:
        headingComponent = (
          <h6 className={cls}>
            <a href={this.props.href} className="hyperlink"
               target={this.props.target} onClick={this.onClick}>
              {this.props.children}
            </a>
          </h6>
        );
        break;
      default:
        headingComponent = (
          <h1 className={cls} style={style}>
            <a href={this.props.href} className="hyperlink"
               target={this.props.target} onClick={this.onClick}>
              {this.props.children}
            </a>
          </h1>
        );
    }

    return (
      <div onClick={this.props.onClick}>
        {headingComponent}
      </div>
    );
  }
}

Text.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),

  ...CommonProps.links,
  ...CommonProps.text,
  ...CommonProps.loggings,

  buttonFont: PropTypes.bool,
  onClick: PropTypes.func,
  children: function (props, propName, componentName) {
    let errorsCount = 0;
    React.Children.forEach(props.children, function (e) {
      if (typeof (e) !== 'string') {
        errorsCount++;
      }
    });

    if (errorsCount > 0) {
      return new Error(
        '`' + componentName + '` ' +
        'should have children of the following types: ' +
        ' `string`.'
      );
    }
  },
  ...CommonProps.style,
};


export default Text;