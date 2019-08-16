import React from 'react';
import PropTypes from 'prop-types';
import Logger from '../../../firebase/logger';
import './style.css';
import CommonProps from "../../common/props";


class Image extends React.Component {
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
    return (
      <div onClick={this.props.onClick}>
        <a href={this.props.href} className="hyperlink"
           onClick={this.onClick} target={this.props.target}>
          {
            this.props.width || this.props.height ?
              <img alt={this.props.alt || ' '} src={this.props.src}
                   width={this.props.width} height={this.props.height}
                  className={this.props.className}/> :
              <img alt={this.props.alt || ' '} src={this.props.src}
                   className={`img-autosize ${this.props.className}`}/>
          }
        </a>
      </div>
    );
  }
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  ...CommonProps.links,
  ...CommonProps.loggings,
  onClick: PropTypes.func,
  children: function (props, propName, componentName) {
    let numChildren = React.Children.count(props.children);
    if (numChildren > 0) {
      return new Error(
        '`' + componentName + '` ' +
        'should not have any children.'
      );
    }
  }
};


export default Image;