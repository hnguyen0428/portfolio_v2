import React from 'react';
import Flexbox from '../Flexbox';
import './style.css';
import PropTypes from 'prop-types';


class Card extends React.Component {
  render() {
    let cls = this.props.className;
    if (cls) {
      cls += " card";
    } else {
      cls = "card";
    }

    return (
      <Flexbox {...this.props} className={cls} style={{
        ...this.props.style,
        borderRadius: this.props.borderRadius || 4
      }}>
        {this.props.children}
      </Flexbox>
    );
  }
}

Card.propTypes = {
  ...Flexbox.propTypes,
  borderRadius: PropTypes.number,
};


export default Card;