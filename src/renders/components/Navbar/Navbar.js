import React from 'react';
import PropTypes from 'prop-types';
import NavbarUnit from '../NavbarUnit';
import Flexbox from '../Flexbox';
import NavbarUnitIcon from "../NavbarUnitIcon";
import './style.css';

const stylePropType = require('react-style-proptype');


class Navbar extends React.Component {
  render() {
    return (
      <Flexbox className={this.props.blur ? "navbar navbarBlur" : "navbar"}
               flexDirection="row" justifyContent="flex-end"
               alignItems="center" backgroundColor={this.props.color}>
        {this.props.children}
      </Flexbox>
    );
  }
}

Navbar.propTypes = {
  color: PropTypes.string,
  blur: PropTypes.bool,
  style: stylePropType,
  children: function (props, propName, componentName) {
    let validTypes = [NavbarUnit.name, NavbarUnitIcon.name];
    let errorsCount = 0;
    React.Children.forEach(props.children, function (e) {
      if (validTypes.indexOf(e.type.name) === -1) {
        errorsCount++;
      }
    });

    if (errorsCount > 0) {
      return new Error(
        '`' + componentName + '` ' +
        'should have children of the following types: ' +
        ' `' + validTypes.join(',') + '`.'
      );
    }
  }
};


export default Navbar;