import React from 'react';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import profile from "../../../static/Profile";
import Button from '../../components/Button';
import Text from "../../components/Text";
import ProjectCard from "./ProjectCard";


class Projects extends React.Component {
  render() {
    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE} widthPct={100}
               alignItems="center" paddingVertical={64} marginTop={32}>
        <Flexbox className="overflow-wrap" width={1000}
                 flexDirection="row" alignItems="center"
                 justifyContent="center">
          <Flexbox minWidth={320} maxWidth={320}>
            <Text size={20}
                  weight="bold">{profile.projects.heading}</Text>
            <Text size={13}
                  lineHeight={1.5}>{profile.projects.text}</Text>
          </Flexbox>
          <Flexbox flexDirection="row" alignItems="center" marginLeft={20}
                   flexWrap={'wrap'}>
            {
              profile.projects.objs.slice(0, 4).map((obj) => {
                return (
                  <ProjectCard marginVertical={12} marginHorizontal={12}
                               projectObj={obj} width={272} height={150}
                               paddingHorizontal={16} paddingVertical={8}
                               borderRadius={1}/>
                );
              })
            }
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default Projects;