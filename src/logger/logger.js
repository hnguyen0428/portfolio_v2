import {database} from '../config/firebase';
import moment from 'moment';
import {
  isMobile,
  osName,
  isMobileOnly,
  isBrowser,
  browserName,
  mobileModel
} from 'react-device-detect';


class Logger {
  static getExtraData() {
    return {
      creationTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
      deviceInfo: {
        isMobile: isMobileOnly,
        isTablet: isMobile && !isMobileOnly,
        isBrowser: isBrowser,
        osName: osName,
        browserName: browserName,
        mobileModel: mobileModel
      }
    };
  }

  static genLog(data, onSuccess, onFailure) {
    let extraData = this.getExtraData();
    data = {
      ...extraData,
      ...data
    };

    database.ref('actions').push(data)
      .then(onSuccess).catch(onFailure)
  }
}

export default Logger;