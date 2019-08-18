import React from 'react';
import ReactComponent from "../../ReactComponent";
import PropTypes from 'prop-types';
import CSSColor from "../../../constants/CSSColor";
import Flexbox from "../../components/Flexbox";
import profile from "../../../static/Profile";
import Button from '../../components/Button';
import Text from "../../components/Text";
import ProjectCard from "./ProjectCard";
import TextInput from "../../components/TextInput";
import {
  fetchProjectsText, updateProjectContent,
  updateProjectsText,
} from "../../../firebase/profile";


class Projects extends ReactComponent {
  constructor(props) {
    super(props);

    let heading = profile.projects.heading;
    let text = profile.projects.text;
    let objs = profile.projects.objs;
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
    updateProjectsText(this.state.heading, this.state.text, () => {
    }, (error) => {
      alert('Error updating projects section.');
    });
  };

  componentWillMount() {
    fetchProjectsText((obj) => {
      this.setState({
        heading: obj.heading || this.state.heading,
        text: obj.text || this.state.text,
        objs: obj.objs || this.state.objs,
      });
    });
  }

  onChangeLongDesc = (e, val, dbKey) => {
    let objs = this.state.objs;
    objs[dbKey] = {...objs[dbKey], longDesc: val};
    this.setState({
      objs: objs,
    });
  };

  onChangeShortDesc = (e, val, dbKey) => {
    let objs = this.state.objs;
    objs[dbKey] = {...objs[dbKey], shortDesc: val};
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
    updateProjectContent(this.state.objs[dbKey], dbKey, () => {
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

        <Flexbox alignItems="center">
          {
            keys.map((index) => {
              let id = `ProjectCard_${index}`;
              return (
                <ProjectCard key={index} dbKey={index} id={id}
                             marginVertical={12}
                             projectObj={objs[index]}
                             paddingHorizontal={16} paddingVertical={8}
                             borderRadius={1}
                             allowEdit={this.props.allowEdit}
                             onChangeLongDesc={this.onChangeLongDesc}
                             onChangeShortDesc={this.onChangeShortDesc}
                             onChangeTechUsed={this.onChangeTechUsed}
                             onSave={this.onClickSaveButton}/>
              );
            })
          }
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
        <Flexbox className="overflow-wrap" width={1000}
                 flexDirection="row" alignItems="center"
                 justifyContent="center">
          <Flexbox minWidth={320} maxWidth={320}>
            {
              this.props.allowEdit ?
                <TextInput fontSize={20} fontWeight="bold" textarea
                           value={this.state.heading} rows={2}
                           onChange={this.onChangeHeading}/> :
                <Text fontSize={20}
                      fontWeight="bold">{this.state.heading}</Text>
            }
            {
              this.props.allowEdit ?
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
                  <ProjectCard key={index} dbKey={index}
                               marginVertical={12} marginHorizontal={12}
                               projectObj={objs[index]} width={272} height={150}
                               paddingHorizontal={16} paddingVertical={8}
                               borderRadius={1}
                               allowEdit={this.props.allowEdit}
                               onChangeLongDesc={this.onChangeLongDesc}
                               onChangeShortDesc={this.onChangeShortDesc}
                               onChangeTechUsed={this.onChangeTechUsed}
                               onSave={this.onClickSaveButton}/>
                );
              })
            }
          </Flexbox>
        </Flexbox>
        {
          this.props.allowEdit ?
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

Projects.propTypes = {
  allowEdit: PropTypes.bool,
};

export default Projects;