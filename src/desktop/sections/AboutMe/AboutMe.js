import React from 'react';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import ProfileImage from "../../components/ProfileImage";
import profile from "../../../static/Profile";
import Text from "../../components/Text";
import Button from "../../components/Button";

class AboutMe extends React.Component {
  render() {
    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE} widthPct={100}
               alignItems="center" paddingVertical={28}>
        <Flexbox className="overflow-wrap"
                 width={1100}
                 flexDirection="row" alignItems="center"
                 justifyContent="center">
          <Flexbox paddingHorizontal={32} alignItems="center">
            <ProfileImage src={profile.profileImage} size={350} circular/>
            <Flexbox marginTop={16}>
              <Button label={"Email Me!"} allBorder borderRadius={2}
                      paddingHorizontal={12} paddingVertical={4}
                      color={CSSColor.GRAY_80} fontWeight={500}
                      backgroundColor={CSSColor.LIGHT_WHITE}
                      borderColor={CSSColor.BLACK_ALPHA_60} borderWidth={2}
                      href={`mailto: ${profile.email}`}/>
            </Flexbox>
          </Flexbox>
          <Flexbox flexDirection="column">
            <Text size={20} weight="bold">{profile.aboutMe.heading}</Text>
            <Text size={13} lineHeight={1.5}>{profile.aboutMe.text}</Text>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default AboutMe;