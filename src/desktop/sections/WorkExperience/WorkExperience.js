import React from 'react';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import profile from "../../../static/Profile";
import Button from '../../components/Button';
import Text from "../../components/Text";
import WorkExperienceCard from "./WorkExperienceCard";
import TextInput from "../../components/TextInput";
import {
  fetchWorkExperienceText,
  updateWorkExperienceText
} from "../../../firebase/profile";
import {getEditMode} from "../../common/utils";
import {fetchLoginState} from "../../../firebase/auth";

const firebase = require('firebase');


class WorkExperience extends React.Component {
  constructor(props) {
    super(props);

    let edit = getEditMode();
    let heading = profile.workExperience.heading;
    let text = profile.workExperience.text;
    let objs = profile.workExperience.objs;
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
    updateWorkExperienceText(this.state.heading, this.state.text, () => {

    }, (error) => {
      alert('Error updating work experience section.');
    });
  };

  componentWillMount() {
    fetchLoginState((loggedIn) => this.setState({loggedIn: loggedIn}));
    fetchWorkExperienceText((obj) => {
      this.setState({
        heading: obj.heading || this.state.heading,
        text: obj.text || this.state.text,
        objs: obj.objs || this.state.objs,
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
        <Flexbox className="overflow-wrap"
                 width={900} flexDirection="row" alignItems="center"
                 justifyContent="center">
          <Flexbox minWidth={300} width={300} marginRight={16}>
            <Flexbox flexDirection="row"
                     widthPct={100} bottomBorder>
              <Button label="Internships" fontSize={14} bottomBorder
                      borderWidth={2} borderColor={CSSColor.GRAY_70}/>
            </Flexbox>
            <Flexbox paddingHorizontal={16} paddingVertical={16}>
              {
                keys.map((index) => {
                  return (
                    <WorkExperienceCard key={index} dbKey={index}
                                        marginVertical={12}
                                        workExpObj={objs[index]}
                                        borderRadius={1}/>
                  );
                })
              }
            </Flexbox>
          </Flexbox>
          <Flexbox flexGrow={1} marginLeft={16}>
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
                           value={this.state.text} rows={5}
                           onChange={this.onChangeText} fillHeight/> :
                <Text fontSize={13}
                      lineHeight={1.5}>{this.state.text}</Text>
            }
          </Flexbox>
        </Flexbox>
        {
          loggedIn && this.state.edit ?
            <Flexbox paddingTop={32}>
              <Button label="Update Work Experience" fontSize={18}
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

export default WorkExperience;