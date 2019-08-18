import React from 'react';
import {isMobileOnly} from 'react-device-detect';


class ReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.desktopRender = this.desktopRender.bind(this);
    this.mobileRender = this.mobileRender.bind(this);
  }

  desktopRender() {return null;}
  mobileRender() {return null;}

  render() {
    return isMobileOnly ? this.mobileRender() : this.desktopRender();
  }
}

export default ReactComponent