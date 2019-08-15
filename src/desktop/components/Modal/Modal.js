import React from 'react';
import PropTypes from 'prop-types';

import Flexbox from '../Flexbox';
import Card from '../Card';
import Text from '../Text';
import './style.css';
import CSSColor from "../../../constants/CSSColor";


class Modal extends React.Component {
  static get modalSizes() {
    return {
      small: {
        width: 360,
        height: 240,
      },
      medium: {
        width: 480,
        height: 360,
      },
      large: {
        width: 640,
        height: 480,
      },
    };
  }

  onClickModal = (e) => {
    e.stopPropagation();
  };

  render() {
    let size = this.props.size || 'medium';
    size = Modal.modalSizes[size];

    let shouldShow = this.props.show !== null ? this.props.show : false;
    let cls = ["modal", shouldShow ? "modal-visible" : "modal-hidden", "modal-blur"];
    cls = cls.join(' ');

    return (
      <Flexbox className={cls} justifyContent="center" alignItems="center"
               onClick={this.props.onBackdropClick}>
        <Card backgroundColor={CSSColor.GRAY_05}
              style={{width: 'auto', height: 'auto'}}
              maxWidth={640} maxHeight={480}
              minWidth={size.width} minHeight={size.height}
              flexShrink={0} onClick={this.onClickModal}
              paddingAll={24}>
          {this.props.children}
        </Card>
      </Flexbox>
    );
  }
}

Modal.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  show: PropTypes.bool,
  onBackdropClick: PropTypes.func,
};


export default Modal;