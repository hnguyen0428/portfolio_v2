import React from 'react';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import profile from "../../../static/Profile";
import Button from '../../components/Button';
import Text from "../../components/Text";
import WorkExperienceCard from "./WorkExperienceCard";


class WorkExperience extends React.Component {
  render() {
    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE} widthPct={100}
               alignItems="center" paddingVertical={64} marginTop={32}>
        <Flexbox className="overflow-wrap"
                 width={900} flexDirection="row" alignItems="center"
                 justifyContent="center">
          <Flexbox flexGrow={1} marginRight={16}>
            <Flexbox flexDirection="row"
                     widthPct={100} bottomBorder>
              <Button label="Internships" fontSize={14} bottomBorder
                      borderWidth={2} borderColor={CSSColor.GRAY_70}/>
            </Flexbox>
            <Flexbox paddingHorizontal={16} paddingVertical={16}>
              {
                profile.workExperience.objs.map((obj) => {
                  return (
                    <WorkExperienceCard marginVertical={12} workExpObj={obj}
                                        borderRadius={1}/>
                  );
                })
              }
            </Flexbox>
          </Flexbox>
          <Flexbox marginLeft={16}>
            <Text size={20}
                  weight="bold">{profile.workExperience.heading}</Text>
            <Text size={13}
                  lineHeight={1.5}>{profile.workExperience.text}</Text>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default WorkExperience;