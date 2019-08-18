import React from 'react';
import ReactComponent from "../../ReactComponent";
import PropTypes from 'prop-types';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import profile from "../../../static/Profile";
import Button from '../../components/Button';
import Text from "../../components/Text";
import WorkExperienceCard from "./WorkExperienceCard";
import TextInput from "../../components/TextInput";
import {
  fetchWorkExperienceText, updateWorkExperienceContent,
  updateWorkExperienceText
} from "../../../firebase/profile";


class WorkExperience extends ReactComponent {
  constructor(props) {
    super(props);

    let heading = profile.workExperience.heading;
    let text = profile.workExperience.text;
    let objs = profile.workExperience.objs;
    this.state = {
      heading: heading,
      text: text,
      objs: objs,
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
    fetchWorkExperienceText((obj) => {
      this.setState({
        heading: obj.heading || this.state.heading,
        text: obj.text || this.state.text,
        objs: obj.objs || this.state.objs,
      });
    });
  }

  onChangeDescription = (e, val, dbKey) => {
    let objs = this.state.objs;
    objs[dbKey] = {...objs[dbKey], description: val};
    this.setState({
      objs: objs,
    });
  };

  onChangeTechUsed = (e, val, dbKey) => {
    let objs = this.state.objs;
    objs[dbKey] = {...objs[dbKey], techUsed: val};
    this.setState({
      objs: objs,
    });
  };

  onClickSaveButton = (e, dbKey) => {
    updateWorkExperienceContent(this.state.objs[dbKey], dbKey, () => {
    }, (error) => {
      alert('Error updating work experience card.');
    });
  };

  mobileRender() {
    let objs = this.state.objs;
    let keys = Object.keys(this.state.objs);
    keys = keys.sort();

    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE}
               alignItems="center" paddingVertical={32} marginTop={32}
               paddingHorizontal={20}>
        <Flexbox>
          <Text fontSize={20} fontWeight="bold">{this.state.heading}</Text>
          <Text fontSize={13} lineHeight={1.5}>{this.state.text}</Text>
        </Flexbox>

        <Flexbox>
          <Flexbox flexDirection="row"
                   widthPct={100} bottomBorder>
            <Button label="Internships" fontSize={14} bottomBorder
                    borderWidth={2} borderColor={CSSColor.GRAY_70}/>
          </Flexbox>
          <Flexbox paddingHorizontal={16} paddingVertical={16}>
            {
              keys.map((index) => {
                let id = `WorkExperienceCard_${index}`;
                return (
                  <WorkExperienceCard key={id} dbKey={index} id={index}
                                      marginVertical={12}
                                      workExpObj={objs[index]}
                                      borderRadius={1}
                                      allowEdit={this.props.allowEdit}
                                      onChangeDescription={this.onChangeDescription}
                                      onChangeTechUsed={this.onChangeTechUsed}
                                      onSave={this.onClickSaveButton}/>
                );
              })
            }
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }

  desktopRender() {
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
                                        borderRadius={1}
                                        allowEdit={this.props.allowEdit}
                                        onChangeDescription={this.onChangeDescription}
                                        onChangeTechUsed={this.onChangeTechUsed}
                                        onSave={this.onClickSaveButton}/>
                  );
                })
              }
            </Flexbox>
          </Flexbox>
          <Flexbox flexGrow={1} marginLeft={16}>
            {
              this.props.allowEdit ?
                <TextInput fontSize={20} fontWeight="bold" textarea
                           value={this.state.heading} rows={1}
                           onChange={this.onChangeHeading}/> :
                <Text fontSize={20}
                      fontWeight="bold">{this.state.heading}</Text>
            }
            {
              this.props.allowEdit ?
                <TextInput fontSize={13} lineHeight={1.5} textarea
                           value={this.state.text} rows={5}
                           onChange={this.onChangeText} fillHeight/> :
                <Text fontSize={13}
                      lineHeight={1.5}>{this.state.text}</Text>
            }
          </Flexbox>
        </Flexbox>
        {
          this.props.allowEdit ?
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

WorkExperience.propTypes = {
  allowEdit: PropTypes.bool,
};

export default WorkExperience;