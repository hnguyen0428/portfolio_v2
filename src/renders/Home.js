import React from 'react';
import ReactComponent from "./ReactComponent";

import Logger from '../firebase/logger';
import Flexbox from './components/Flexbox';
import Navbar from './components/Navbar';
import NavbarUnit from './components/NavbarUnit';
import NavbarUnitIcon from './components/NavbarUnitIcon';
import profile from '../static/Profile';

import './style.css';
import AboutMe from "./sections/AboutMe";
import WorkExperience from "./sections/WorkExperience";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import {fetchLoginState, logout} from "../firebase/auth";
import {getEditMode, getUserMode} from "../common/utils";
import LogMetrics from "./sections/LogMetrics";
import Education from "./sections/Education";


class Home extends ReactComponent {
  constructor(props) {
    super(props);

    let edit = getEditMode();
    let userMode = getUserMode();
    this.state = {
      loggedIn: false,
      edit: edit,
      userMode: userMode,
    };
  }

  async componentDidMount() {
    let hasLogged = sessionStorage.getItem('hasLogged');
    if (hasLogged !== '1') {
      Logger.genLog({
        action: 'view_portfolio',
        description: 'Viewed Portfolio',
      }, (_) => {
        sessionStorage.setItem('hasLogged', '1');
      });
    }
    let loggedIn = await fetchLoginState();
    this.setState({loggedIn: loggedIn});
  }

  onClickLogout = (e) => {
    logout(() => {
      this.setState({loggedIn: false});
    }, (e) => {
      alert(e);
    });
  };

  onClickEditMode = (e) => {
    this.setState({edit: true});
  };

  onClickUserMode = (e) => {
    this.setState({userMode: true});
  };

  mobileRender() {
    let root = process.env.NODE_ENV === 'development' ? '/' : '/portfolio/';
    let {loggedIn, userMode} = this.state;

    return (
      <Flexbox alignItems="center">
        <Navbar blur>
          <NavbarUnit label="Daniel Nguyen" position="left" fontWeight={400}
                      paddingHorizontal={8} href={root} fontSize={12}
                      lineHeight={1.5}/>
          {
            loggedIn && !userMode ?
              <NavbarUnit label="User Mode" onClick={this.onClickUserMode}
                          paddingHorizontal={8} fontSize={12}/> :
              null
          }
          {
            loggedIn && !userMode ?
              <NavbarUnit label="Logout" onClick={this.onClickLogout}
                          paddingHorizontal={8} fontSize={12}/> :
              null
          }
          <NavbarUnit label="Resume" href="assets/Resume.pdf" target="_blank"
                      logClick={true} logDescription="Visited Resume"
                      fontSize={12}/>
        </Navbar>

        <AboutMe/>
        <WorkExperience/>
        <Projects/>
        <Education/>
        {
          loggedIn && !userMode
            ? <LogMetrics/>
            : null
        }
        <Contacts/>
      </Flexbox>
    );
  }

  desktopRender() {
    let {loggedIn, userMode, edit} = this.state;
    let allowEdit = loggedIn && edit && !userMode;

    let root = process.env.NODE_ENV === 'development' ? '/' : '/portfolio/';
    return (
      <Flexbox className="root" alignItems="center">
        <Navbar blur>
          <NavbarUnit label="Daniel Nguyen" position="left" fontWeight={500}
                      paddingHorizontal={16} href={root}/>
          {
            loggedIn && !userMode ?
              <NavbarUnit label="User Mode"
                          paddingHorizontal={8}
                          onClick={this.onClickUserMode}/> :
              null
          }
          {
            loggedIn && !userMode ?
              <NavbarUnit label="Edit Mode"
                          paddingHorizontal={8}
                          onClick={this.onClickEditMode}/> :
              null
          }
          {
            loggedIn && !userMode ?
              <NavbarUnit label="Logout" onClick={this.onClickLogout}
                          paddingHorizontal={12}/> :
              null
          }
          <NavbarUnit label="Resume" href="assets/Resume.pdf" target="_blank"
                      logClick={true} logDescription="Visited Resume" allBorder
                      borderRadius={6}/>
          <NavbarUnitIcon src={"assets/github_icon.png"}
                          href={profile.githubLink} target="_blank"
                          logClick={true} logDescription="Visited Github"
                          paddingHorizontal={12}/>
          <NavbarUnitIcon src={"assets/linkedin_icon.png"}
                          href={profile.linkedinLink} target="_blank"
                          logClick={true} logDescription="Visited LinkedIn"
                          paddingHorizontal={12}/>
          <NavbarUnitIcon src={"assets/facebook_icon.png"}
                          href={profile.fbLink} target="_blank"
                          logClick={true} logDescription="Visited Facebook"
                          paddingHorizontal={12}/>
        </Navbar>

        <AboutMe allowEdit={allowEdit}/>
        <WorkExperience allowEdit={allowEdit}/>
        <Projects allowEdit={allowEdit}/>
        <Education allowEdit={allowEdit} loggedIn={loggedIn}/>
        {
          loggedIn && !userMode
            ? <LogMetrics/>
            : null
        }
      </Flexbox>
    );
  }
}


export default Home;