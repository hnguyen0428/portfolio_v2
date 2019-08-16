import React from 'react';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import ProfileImage from "../../components/ProfileImage";
import profile from "../../../static/Profile";
import Text from "../../components/Text";
import Button from "../../components/Button";
import {fetchProfileText, updateProfileText} from "../../../firebase/profile";
import TextInput from "../../components/TextInput";
import {getEditMode} from "../../common/utils";
import {fetchLoginState} from "../../../firebase/auth";
const firebase = require('firebase');

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    let edit = getEditMode();
    let heading = profile.aboutMe.heading;
    let text = profile.aboutMe.text;
    this.state = {
      heading: heading,
      text: text,
      edit: edit,
      loggedIn: false,
    }
  }

  onChangeHeading = (e, val) => {
    this.setState({heading: val});
  };

  onChangeText = (e, val) => {
    this.setState({text: val});
  };

  onClickUpdate = (e) => {
    // Update About Me info
    updateProfileText(this.state.heading, this.state.text, () => {

    }, (error) => {
      alert('Error updating about me section.');
    });
  };

  componentWillMount() {
    fetchLoginState((loggedIn) => this.setState({loggedIn: loggedIn}));
    fetchProfileText((obj) => {
      this.setState({
        heading: obj.heading || this.state.heading,
        text: obj.text || this.state.text,
      });
    });
  }

  render() {
    let loggedIn = this.state.loggedIn;

    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE} widthPct={100}
               alignItems="center" paddingVertical={64}>
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
          <Flexbox flexDirection="column" flexGrow={1}>
            {
              loggedIn && this.state.edit ?
                <TextInput fontSize={20} fontWeight="bold" textarea
                           value={this.state.heading} rows={1}
                           onChange={this.onChangeHeading}/> :
                <Text fontSize={20}
                      fontWeight="bold">{this.state.heading}</Text>
            }
            {
              loggedIn && this.state.edit ?
                <TextInput fontSize={13} lineHeight={1.5} textarea
                           value={this.state.text} rows={15}
                           onChange={this.onChangeText} fillHeight/> :
                <Text fontSize={13}
                      lineHeight={1.5}>{this.state.text}</Text>
            }
          </Flexbox>
        </Flexbox>
        {
          loggedIn && this.state.edit ?
            <Flexbox paddingTop={32}>
              <Button label="Update About Me" fontSize={18} fontWeight={500}
                      borderColor={CSSColor.BLACK_ALPHA_60} borderWidth={2}
                      borderRadius={6} paddingHorizontal={12} allBorder
                      lineHeight={0.8} onClick={this.onClickUpdate}/>
            </Flexbox> :
            null
        }
      </Flexbox>
    );
  }
}

export default AboutMe;