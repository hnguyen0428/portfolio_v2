import {database} from '../config/firebase';
import {fetchLoginState} from "./auth";
import moment from 'moment';
import {
  isMobile,
  osName,
  osVersion,
  isMobileOnly,
  isBrowser,
  browserName,
  mobileModel,
  mobileVendor,
  fullBrowserVersion,
  engineName,
  engineVersion,
  getUA,
} from 'react-device-detect';


class Logger {
  static getExtraData() {
    return {
      creationTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
      timestamp: moment().unix(),
      deviceInfo: {
        isMobile: isMobileOnly,
        isTablet: isMobile && !isMobileOnly,
        isBrowser: isBrowser,
        osName: osName,
        osVersion: osVersion,
        browserName: browserName,
        fullBrowserVersion: fullBrowserVersion,
        mobileVendor: mobileVendor,
        mobileModel: mobileModel,
        engineName: engineName,
        engineVersion: engineVersion,
        userAgent: getUA,
      }
    };
  }

  static genLog(data, onSuccess, onFailure) {
    fetchLoginState((loggedIn) => {
      // Only log if not logged in
      if (!loggedIn) {
        let extraData = this.getExtraData();
        data = {
          ...extraData,
          ...data
        };

        database.ref('actions').push(data)
          .then(onSuccess).catch(onFailure)
      }
    });
  }
}

export default Logger;