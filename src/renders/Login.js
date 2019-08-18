import React from 'react';
import ReactComponent from "./ReactComponent";
import Flexbox from './components/Flexbox';
import Navbar from './components/Navbar';
import NavbarUnit from './components/NavbarUnit';
import NavbarUnitIcon from './components/NavbarUnitIcon';
import Text from './components/Text';
import TextInput from './components/TextInput';
import profile from '../static/Profile';

import './style.css';
import Button from "./components/Button";
import CSSColor from "../constants/CSSColor";
import {loginWithEmail} from '../firebase/auth';
import history from './history';


class Login extends ReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  onEmailChange = (e, val) => {
    this.setState({email: val});
  };

  onPasswordChange = (e, val) => {
    this.setState({password: val});
  };

  onClickLogin = (e) => {
    // Firebase login
    let root = '/?edit=true';
    loginWithEmail(this.state.email, this.state.password, (user) => {
      history.push(root);
    }, (error) => {
      alert(error);
    });
  };

  mobileRender() {
    let root = process.env.NODE_ENV === 'development' ? '/' : '/portfolio/';
    return (
      <Flexbox className="root login-page" widthPct={100}
               heightPct={100} alignItems="center" justifyContent="center">
        <Navbar blur>
          <NavbarUnit label="Daniel Nguyen" position="left" fontWeight={400}
                      paddingHorizontal={8} href={root} fontSize={12}
                      lineHeight={1.5}/>
          <NavbarUnit label="Resume" href="assets/Resume.pdf" target="_blank"
                      logClick={true} logDescription="Visited Resume" fontSize={12}/>
        </Navbar>

        <Flexbox heightPct={100} alignItems="center"
                 justifyContent="center" paddingHorizontal={20}>
          <Flexbox width={300} justifyContent="center" alignItems="center">
            <form id="admin-login" style={{width: 'inherit'}}>
              <Flexbox paddingVertical={8}>
                <TextInput fillHeight type="email" placeholder="Email" minHeight={25}
                           onChange={this.onEmailChange} autoComplete="on"/>
              </Flexbox>
              <Flexbox minHeight={40} paddingVertical={8}>
                <TextInput fillHeight type="password" placeholder="Password" minHeight={25}
                           onChange={this.onPasswordChange} autoComplete="on"/>
              </Flexbox>
            </form>

            <Flexbox paddingVertical={8}>
              <Button label="Login" fontSize={16} fontWeight={500} allBorder
                      borderRadius={4} borderWidth={2}
                      borderColor={CSSColor.BLACK_ALPHA_60}
                      paddingHorizontal={8} lineHeight={0.5}
                      onClick={this.onClickLogin}
                      disabled={
                        this.state.email.length === 0 ||
                        this.state.password.length === 0
                      }
                      disabledColor={CSSColor.GRAY_20}
                      disabledBorderColor={CSSColor.GRAY_20}
              />
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }

  desktopRender() {
    let root = process.env.NODE_ENV === 'development' ? '/' : '/portfolio/';
    return (
      <Flexbox className="root login-page" widthPct={100}
               heightPct={100} alignItems="center" justifyContent="center">
        <Navbar blur>
          <NavbarUnit label="Daniel Nguyen" position="left" fontWeight={500}
                      paddingHorizontal={16} href={root}/>
          <NavbarUnit label="Resume" href="assets/Resume.pdf" target="_blank"
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

        <Flexbox widthPct={100} heightPct={100} alignItems="center"
                 justifyContent="center">
          <Flexbox width={350} justifyContent="center" alignItems="center">
            <form id="admin-login" style={{width: 'inherit'}}>
              <Flexbox widthPct={100} paddingVertical={8}>
                <TextInput fillHeight type="email" placeholder="Email" minHeight={25}
                           onChange={this.onEmailChange} autoComplete="on"/>
              </Flexbox>
              <Flexbox widthPct={100} minHeight={40} paddingVertical={8}>
                <TextInput fillHeight type="password" placeholder="Password" minHeight={25}
                           onChange={this.onPasswordChange} autoComplete="on"/>
              </Flexbox>
            </form>

            <Flexbox paddingVertical={8}>
              <Button label="Login" fontSize={16} fontWeight={500} allBorder
                      borderRadius={4} borderWidth={2}
                      borderColor={CSSColor.BLACK_ALPHA_60}
                      paddingHorizontal={8} lineHeight={0.5}
                      onClick={this.onClickLogin}
                      disabled={
                        this.state.email.length === 0 ||
                        this.state.password.length === 0
                      }
                      disabledColor={CSSColor.GRAY_20}
                      disabledBorderColor={CSSColor.GRAY_20}
              />
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}


export default Login;