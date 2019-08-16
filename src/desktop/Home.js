import React from 'react';
import Logger from '../firebase/logger';
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
import {logout} from "../firebase/auth";

const firebase = require('firebase');


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    let hasLogged = sessionStorage.getItem('hasLogged');
    if (hasLogged !== '1') {
      Logger.genLog({
        action: 'view_portfolio',
        description: 'Viewed Portfolio',
      }, (_) => {
        sessionStorage.setItem('hasLogged', '1');
      });
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  onClickLogout = (e) => {
    logout(() => {
      this.setState({loggedIn: false});
    }, (e) => {
      alert(e);
    });
  };

  render() {
    let loggedIn = this.state.loggedIn;

    let root = process.env.NODE_ENV === 'development' ? '/' : '/portfolio/';
    return (
      <Flexbox style={style.root} alignItems="center">
        <Navbar blur>
          <NavbarUnit label="Daniel Nguyen" position="left" fontWeight={500}
                      paddingHorizontal={16} href={root}/>
          {
            loggedIn ?
              <NavbarUnit label="Logout" onClick={this.onClickLogout}
                          paddingHorizontal={16}/> :
              null
          }
          <NavbarUnit label="Resume" href="assets/Resume.pdf" target="_blank"
                      logClick={true} logDescription="Visited Resume" allBorder
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