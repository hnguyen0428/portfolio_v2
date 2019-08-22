import React from 'react';
import ReactComponent from "../../ReactComponent";
import Flexbox from "../../components/Flexbox";
import Text from "../../components/Text";
import CSSColor from "../../../constants/CSSColor";
import "../../../constants/common.css";
import moment from 'moment';
import {fetchActions} from "../../../firebase/profile";


class LogMetrics extends ReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      metrics: null,
      latestActionDate: null,
      latestActionDesc: null,
      deviceMetrics: {browser: 0, mobile: 0, tablet: 0},
    }
  }

  async componentDidMount() {
    let actions = await fetchActions();
    if (actions === null) {
      return;
    }

    let categories = {};
    let countMap = {};
    let deviceCountMap = {browser: 0, mobile: 0, tablet: 0};
    let latestTime = null;
    let latestAction = null;
    actions = Object.values(actions);
    actions.forEach((action) => {
      if (categories[action.action] === undefined) {
        categories[action.action] = [];
      }
      categories[action.action].push(action);

      if (action.timestamp && (latestTime === null || latestTime < action.timestamp)) {
        latestTime = action.timestamp;
        latestAction = action.description
      }

      if (action.action === 'view_portfolio') {
        if (action.deviceInfo.isMobile) {
          deviceCountMap.mobile++;
        } else if (action.deviceInfo.isTablet) {
          deviceCountMap.tablet++;
        } else if (action.deviceInfo.isBrowser) {
          deviceCountMap.browser++;
        }
      }
    });

    for (let category in categories) {
      let actions = categories[category];
      if (countMap[category] === undefined) {
        countMap[category] = {};
      }
      actions.forEach((action) => {
        if (countMap[category][action.description] === undefined) {
          countMap[category][action.description] = 0;
        }
        countMap[category][action.description]++;
      });
    }

    this.setState({
      metrics: countMap,
      deviceMetrics: deviceCountMap,
      latestActionDate: latestTime !== null
        ? moment.unix(latestTime).format('MMMM Do YYYY, h:mm:ss a')
        : null,
      latestActionDesc: latestAction !== null ? latestAction : null,
    });
  }

  mobileRender() {
    let {metrics, deviceMetrics} = this.state;
    let categories = metrics === null ? [] : Object.keys(metrics);

    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE}
               alignItems="center" paddingVertical={32} marginTop={32}
               widthPct={100}>
        {
          categories.map((category) => {
            let actionKeys = Object.keys(metrics[category]);

            return (
              <Flexbox alignSelf="flex-start" paddingHorizontal={20}>
                <Text fontWeight="bold" fontSize={18}>{category}</Text>
                {
                  actionKeys.map((description) => {
                    let count = metrics[category][description];
                    return (
                      <Text lineHeight={0.5}>{description}: {count}</Text>
                    );
                  })
                }
              </Flexbox>
            );
          })
        }
        <Flexbox paddingTop={32} paddingHorizontal={20}>
          <Text lineHeight={0.5}>Visits from Desktop: {deviceMetrics.browser}</Text>
          <Text lineHeight={0.5}>Visits from Mobile: {deviceMetrics.mobile}</Text>
          <Text lineHeight={0.5}>Visits from Tablet: {deviceMetrics.tablet}</Text>
          <Flexbox paddingTop={20}>
            <Text fontWeight="bold" lineHeight={0.2}>Latest Action:</Text>
            <Text lineHeight={1.4}>
              {this.state.latestActionDesc} on {this.state.latestActionDate}
            </Text>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }

  desktopRender() {
    let {metrics, deviceMetrics} = this.state;
    let categories = metrics === null ? [] : Object.keys(metrics);

    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE}
               alignItems="center" paddingVertical={32} marginTop={32}
               widthPct={100}>
        <Flexbox flexDirection="row" widthPct={100} justifyContent="center"
                 paddingHorizontal={20} className="border-box">
          {
            categories.map((category) => {
              let actionKeys = Object.keys(metrics[category]);

              return (
                <Flexbox maxWidth={300} maxHeight={300} paddingHorizontal={25}
                         paddingVertical={25}>
                  <Text fontWeight="bold" fontSize={18}>{category}</Text>
                  {
                    actionKeys.map((description) => {
                      let count = metrics[category][description];
                      return (
                        <Text lineHeight={0.5}>{description}: {count}</Text>
                      );
                    })
                  }
                </Flexbox>
              );
            })
          }
        </Flexbox>
        <Flexbox flexDirection="row" widthPct={100} justifyContent="center"
                 paddingHorizontal={20} className="border-box">
          <Flexbox paddingHorizontal={25}>
            <Text lineHeight={0.5}>Visits from Desktop: {deviceMetrics.browser}</Text>
          </Flexbox>
          <Flexbox paddingHorizontal={25}>
            <Text lineHeight={0.5}>Visits from Mobile: {deviceMetrics.mobile}</Text>
          </Flexbox>
          <Flexbox paddingHorizontal={25}>
            <Text lineHeight={0.5}>Visits from Tablet: {deviceMetrics.tablet}</Text>
          </Flexbox>
        </Flexbox>
        <Flexbox>
          <Text>
            Latest Action: {this.state.latestActionDesc} on {this.state.latestActionDate}
          </Text>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default LogMetrics;