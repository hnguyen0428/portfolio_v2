import React from 'react';
import ReactComponent from "../../ReactComponent";
import Flexbox from "../../components/Flexbox";
import Text from "../../components/Text";
import CSSColor from "../../../constants/CSSColor";
import {fetchActions} from "../../../firebase/profile";


class LogMetrics extends ReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      metrics: null,
    }
  }

  componentDidMount() {
    fetchActions((actions) => {
      if (actions === null) {
        return;
      }

      let categories = {};
      let countMap = {};
      actions = Object.values(actions);
      actions.forEach((action) => {
        if (categories[action.action] === undefined) {
          categories[action.action] = [];
        }
        categories[action.action].push(action);
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

      this.setState({metrics: countMap});
    });
  }

  mobileRender() {
    let {metrics} = this.state;
    if (metrics === null) {
      return null;
    }

    let categories = Object.keys(metrics);

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
      </Flexbox>
    );
  }

  desktopRender() {
    let {metrics} = this.state;
    if (metrics === null) {
      return null;
    }

    let categories = Object.keys(metrics);

    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE}
               alignItems="center" paddingVertical={32} marginTop={32}
               widthPct={100}>
        <Flexbox flexDirection="row" width={1300} justifyContent="center"
                 paddingHorizontal={20}>
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
      </Flexbox>
    );
  }
}

export default LogMetrics;