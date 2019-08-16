import React from 'react';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import profile from "../../../static/Profile";
import Button from '../../components/Button';
import Text from "../../components/Text";
import ProjectCard from "./ProjectCard";
import TextInput from "../../components/TextInput";
import {getEditMode} from "../../common/utils";
import {fetchProjectsText, updateProjectsText} from "../../../firebase/profile";
import {fetchLoginState} from "../../../firebase/auth";

const firebase = require('firebase');


class Projects extends React.Component {
  constructor(props) {
    super(props);

    let edit = getEditMode();
    let heading = profile.projects.heading;
    let text = profile.projects.text;
    let objs = profile.projects.objs;
    this.state = {
      heading: heading,
      text: text,
      objs: objs,
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
    updateProjectsText(this.state.heading, this.state.text, () => {
    }, (error) => {
      alert('Error updating projects section.');
    });
  };

  componentWillMount() {
    fetchLoginState((loggedIn) => this.setState({loggedIn: loggedIn}));
    fetchProjectsText((obj) => {
      this.setState({
        heading: obj.heading || this.state.heading,
        text: obj.text || this.state.text,
      });
    });
  }

  render() {
    let loggedIn = this.state.loggedIn;
    let objs = this.state.objs;
    let keys = Object.keys(this.state.objs);
    keys = keys.sort();

    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE} widthPct={100}
               alignItems="center" paddingVertical={64} marginTop={32}>
        <Flexbox className="overflow-wrap" width={1000}
                 flexDirection="row" alignItems="center"
                 justifyContent="center">
          <Flexbox minWidth={320} maxWidth={320}>
            {
              loggedIn && this.state.edit ?
                <TextInput fontSize={20} fontWeight="bold" textarea
                           value={this.state.heading} rows={2}
                           onChange={this.onChangeHeading}/> :
                <Text fontSize={20}
                      fontWeight="bold">{this.state.heading}</Text>
            }
            {
              loggedIn && this.state.edit ?
                <TextInput fontSize={13} lineHeight={1.5} textarea
                           value={this.state.text} rows={7}
                           onChange={this.onChangeText} fillHeight/> :
                <Text fontSize={13}
                      lineHeight={1.5}>{this.state.text}</Text>
            }
          </Flexbox>
          <Flexbox flexDirection="row" alignItems="center" marginLeft={20}
                   flexWrap={'wrap'}>
            {
              keys.map((index) => {
                return (
                  <ProjectCard key={index}
                               marginVertical={12} marginHorizontal={12}
                               projectObj={objs[index]} width={272} height={150}
                               paddingHorizontal={16} paddingVertical={8}
                               borderRadius={1}/>
                );
              })
            }
          </Flexbox>
        </Flexbox>
        {
          loggedIn && this.state.edit ?
            <Flexbox paddingTop={32}>
              <Button label="Update Projects" fontSize={18}
                      fontWeight={500} borderColor={CSSColor.BLACK_ALPHA_60}
                      borderWidth={2} borderRadius={6} paddingHorizontal={12}
                      allBorder lineHeight={0.8}
                      onClick={this.onClickUpdate}/>
            </Flexbox> :
            null
        }
      </Flexbox>
    );
  }
}

export default Projects;