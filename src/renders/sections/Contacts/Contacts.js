import React from 'react';
import ReactComponent from "../../ReactComponent";
import Flexbox from "../../components/Flexbox";
import CSSColor from "../../../constants/CSSColor";
import Icon from "../../components/Icon";
import NavbarUnitIcon from "../../components/NavbarUnitIcon";
import profile from "../../../static/Profile";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";


class Contacts extends ReactComponent {
  mobileRender() {
    return (
      <Flexbox backgroundColor={CSSColor.BLACK_ALPHA_80}
               alignItems="center" paddingVertical={32} marginTop={32}
               marginHorizontal={20} widthPct={100}>
        <Flexbox flexDirection="row" justifyContent="center" alignItems="center">
          <Flexbox paddingHorizontal={14}>
            <Icon src="assets/github_icon.png" href={profile.githubLink}
                  target="_blank" logClick logDescription="Visited Github"/>
          </Flexbox>
          <Flexbox paddingHorizontal={14}>
            <Icon src="assets/linkedin_icon.png" href={profile.linkedinLink}
                  target="_blank" logClick logDescription="Visited LinkedIn"/>
          </Flexbox>
          <Flexbox paddingHorizontal={14}>
            <Icon src="assets/facebook_icon.png" href={profile.fbLink}
                  target="_blank" logClick logDescription="Visited Facebook"/>
          </Flexbox>
        </Flexbox>
        <Flexbox marginTop={24}>
          <Button label={"Email Me!"} allBorder borderRadius={6}
                  paddingHorizontal={12} paddingVertical={2} lineHeight={0.8}
                  color={CSSColor.LIGHT_WHITE} fontWeight={500}
                  borderColor={CSSColor.LIGHT_WHITE_ALPHA_80} borderWidth={2}
                  href={`mailto: ${profile.email}`}/>
        </Flexbox>
      </Flexbox>
    );
  }

  desktopRender() {
    return super.desktopRender();
  }
}

export default Contacts;