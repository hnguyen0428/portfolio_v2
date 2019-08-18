import React from 'react';
import PropTypes from 'prop-types';
import style from './style';
import NavbarUnit from '../NavbarUnit';
import Flexbox from '../Flexbox';
import NavbarUnitIcon from "../NavbarUnitIcon";
import './style.css';

const stylePropType = require('react-style-proptype');


class Navbar extends React.Component {
  render() {
    let navbarStyle = style.navbar;
    if (this.props.color) {
      navbarStyle = {...navbarStyle, backgroundColor: this.props.color};
    }

    return (
      <Flexbox className={this.props.blur ? "navbar navbarBlur" : "navbar"}
               style={navbarStyle} flexDirection="row"
               justifyContent="flex-end" alignItems="center">
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