import React from 'react';
import {isMobileOnly} from 'react-device-detect';


class ReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.desktopRender = this.desktopRender.bind(this);
    this.mobileRender = this.mobileRender.bind(this);

    // Prevent render() method from being overridden (it can be overridden but
    // it won't do anything)
    Object.defineProperty(this, 'render', {
      value: () => {
        return isMobileOnly ? this.mobileRender() : this.desktopRender();
      },
      writable: false,
      configurable: false,
    });
  }

  desktopRender() {return null;}
  mobileRender() {return null;}
}

export default ReactComponent