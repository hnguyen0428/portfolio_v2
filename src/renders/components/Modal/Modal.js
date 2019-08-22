import React from 'react';
import PropTypes from 'prop-types';

import Flexbox from '../Flexbox';
import Card from '../Card';
import './style.css';
import CSSColor from "../../../constants/CSSColor";
import CommonProps from "../../../common/props";
import {coalesce} from "../../../common/utils";


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
              style={{width: 'auto', height: 'auto', overflow: 'scroll'}}
              width={this.props.width}
              height={this.props.height}
              maxWidth={coalesce(this.props.maxWidth, 640)}
              maxHeight={coalesce(this.props.maxHeight, 480)}
              minWidth={coalesce(this.props.minWidth, size.width)}
              minHeight={coalesce(this.props.minHeight, size.height)}
              flexShrink={0} onClick={this.onClickModal}
              paddingAll={coalesce(this.props.paddingAll, 24)}
              paddingTop={this.props.paddingTop}
              paddingLeft={this.props.paddingLeft}
              paddingBottom={this.props.paddingBottom}
              paddingRight={this.props.paddingRight}
              paddingVertical={this.props.paddingVertical}
              paddingHorizontal={this.props.paddingHorizontal}
        >
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
  ...CommonProps.paddings,
  ...CommonProps.dimensions,
  onBackdropClick: PropTypes.func,
};


export default Modal;