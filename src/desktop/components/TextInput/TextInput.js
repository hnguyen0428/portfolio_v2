import React from 'react';
import PropTypes from 'prop-types';

import Flexbox from '../Flexbox';
import '../Text/style.css';
import './style.css';
import CSSColor from "../../../constants/CSSColor";
import CommonProps from "../../common/props";
import Text from "../Text";

const stylePropType = require('react-style-proptype');


class TextInput extends React.Component {
  onChange = (e) => {
    let value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  };

  render() {
    let style = {};
    style = CommonProps.setTextStyleOrDefault(style, this.props);
    style = CommonProps.setDimensions(style, this.props);
    if (!this.props.textarea && style.height === undefined) {
      style = this.props.textarea ? style : {...style, height: style.fontSize};
    }
    style = {...style, ...this.props.style};

    let labelComponent =
      this.props.label ?
        <Text color="secondary" fontSize={10}
              lineHeight={0.2}>{this.props.label}</Text>
        : null;

    if (this.props.textarea) {
      return (
        <Flexbox widthPct={100} heightPct={this.props.fillHeight ? 100 : null}>
          {labelComponent}
          <textarea style={style} className="text-input stdFont"
                    onChange={this.onChange} rows={this.props.rows || 5}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    value={this.props.value}/>
        </Flexbox>
      );
    } else {
      return (
        <Flexbox widthPct={100} heightPct={this.props.fillHeight ? 100 : null}>
          {labelComponent}
          <input style={style} className="text-input stdFont"
                 onChange={this.onChange} placeholder={this.props.placeholder}
                 disabled={this.props.disabled} pattern={this.props.pattern}
                 readOnly={this.props.readOnly} type={this.props.type}
                 value={this.props.value}
                 autoComplete={this.props.autoComplete}/>
        </Flexbox>
      );
    }
  }
}

TextInput.propTypes = {
  ...CommonProps.style,
  value: PropTypes.string,

  ...CommonProps.text,
  // Dimension applies to text area only
  ...CommonProps.dimensions,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
  readOnly: PropTypes.bool,
  inputSize: PropTypes.number,
  autoComplete: PropTypes.string,

  fillHeight: PropTypes.bool, // Fill 100% height of parent div
  type: PropTypes.oneOf(['password', 'email', 'text', 'number']),
  textarea: PropTypes.bool,

  rows: PropTypes.number, // Number of rows of textarea
  onChange: PropTypes.func, // (event, value) ==> {}
};

export default TextInput;