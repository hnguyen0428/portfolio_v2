import React from 'react';
import Logger from '../logger/logger';
import CSSColor from '../constants/CSSColor';
import Flexbox from './components/Flexbox';
import Navbar from './components/Navbar';
import NavbarUnit from './components/NavbarUnit';
import NavbarUnitIcon from './components/NavbarUnitIcon';
import Text from './components/Text';
import Card from './components/Card';
import ProfileImage from './components/ProfileImage';
import profile from '../static/Profile';

import style from './style';
import AboutMe from "./sections/AboutMe";
import WorkExperience from "./sections/WorkExperience";
import Projects from "./sections/Projects";


class Home extends React.Component {
  componentDidMount() {
    let hasLogged = sessionStorage.getItem('hasLogged');
    if (hasLogged !== '1') {
      Logger.genLog({
        action: 'visit_portfolio',
        context: this.constructor.name,
      }, (_) => {
        sessionStorage.setItem('hasLogged', '1');
      });
    }
  }

  render() {
    return (
      <Flexbox style={style.root} alignItems="center">
        <Navbar blur>
          <NavbarUnit label="Daniel Nguyen" position="left" fontWeight={500}
                      paddingHorizontal={16} href="/"/>
          {/*<NavbarUnit label="Work Experience"/>*/}
          {/*<NavbarUnit label="Projects"/>*/}
          {/*<NavbarUnit label="Education"/>*/}
          <NavbarUnit label="Resume" href={profile.resumeLink} target="_blank"
                      logClick={true} logDescription="Visited Resume" hasBorder
                      borderRadius={6}/>
          <NavbarUnitIcon src={"assets/github_icon.png"}
                          href={profile.githubLink} target="_blank"
                          logClick={true} logDescription="Visited Github"/>
          <NavbarUnitIcon src={"assets/linkedin_icon.png"}
                          href={profile.linkedinLink} target="_blank"
                          logClick={true} logDescription="Visited LinkedIn"/>
          <NavbarUnitIcon src={"assets/facebook_icon.png"}
                          href={profile.fbLink} target="_blank"
                          logClick={true} logDescription="Visited Facebook"/>
        </Navbar>

        <AboutMe/>
        <WorkExperience/>
        <Projects/>
      </Flexbox>
    );
  }
}


export default Home;