import React from 'react';
import ReactComponent from "../../ReactComponent";
import PropTypes from 'prop-types';

import Flexbox from "../../components/Flexbox";
import CSSColor from "../../../constants/CSSColor";
import ProfileImage from "../../components/ProfileImage";
import profile from "../../../static/Profile";
import Button from "../../components/Button";
import "../../../constants/common.css";
import TextInput from "../../components/TextInput";
import Text from "../../components/Text";
import Modal from "../../components/Modal";
import Icon from "../../components/Icon";
import "./style.css";
import {
  fetchEducation,
  updateEducationText,
  updateEducationCourse,
  addEducationCourse,
  removeEducationCourse
} from "../../../firebase/profile";
import {coalesce} from "../../../common/utils";
import Logger from "../../../firebase/logger";


class Education extends ReactComponent {
  constructor(props) {
    super(props);

    let heading = profile.education.heading;
    let text = profile.education.text;
    this.state = {
      heading: heading,
      text: text,
      objs: [],
      showModal: false,
      btnHover: "btnHover",
      addState: false,
      viewCourseState: {
        showDesc: false,
        key: null,
      },

      courseAdding: {
        name: "",
        description: "",
      },
    };
  }

  componentDidMount() {
    this.fetchEducationObject(true);
  }

  fetchEducationObject = (fromCache) => {
    fetchEducation((obj) => {
      if (obj) {
        let courses = [];
        // Sort by name
        for (let key in obj.objs) {
          courses.push({
            key: key,
            name: obj.objs[key].name,
            description: obj.objs[key].description,
          });
        }
        courses.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name === b.name) {
            return 0;
          } else {
            return 1;
          }
        });

        this.setState({
          heading: coalesce(obj.heading, this.state.heading),
          text: coalesce(obj.text, this.state.text),
          objs: courses,
        });
      }
    }, null, fromCache);
  };

  onClickFaveCourses = (e) => {
    this.setState({showModal: true, btnHover: ""});

    Logger.genLog({
      action: 'view_fave_courses',
      description: 'Viewed Fave Courses',
    });
  };

  onClickUpdate = (e) => {
    updateEducationText(this.state.heading, this.state.text, null, () => {
      alert("Error updating education text.");
    });
  };

  closeModal = (e) => {
    this.setState({showModal: false, btnHover: "btnHover"});
  };

  onClickCourse = (e, key) => {
    this.setState({
      viewCourseState: {
        showDesc: true,
        key: key,
      }
    });

    let course = this.state.objs.find((val) => val.key === key);
    if (course) {
      Logger.genLog({
        action: 'view_fave_courses',
        description: `Viewed ${course.name}`,
      });
    }
  };

  onClickDeleteCourse = (e, key) => {
    removeEducationCourse(key, () => {
      this.fetchEducationObject(false);
    });
  };

  onClickAddCourse = (e) => {
    this.setState({addState: true});
  };

  onChangeCourseName = (e, val) => {
    this.setState({
      courseAdding: {
        ...this.state.courseAdding,
        name: val,
      }
    });
  };

  onChangeCourseDesc = (e, val) => {
    this.setState({
      courseAdding: {
        ...this.state.courseAdding,
        description: val,
      }
    });
  };

  onClickSaveCourseButton = (e) => {
    addEducationCourse(this.state.courseAdding, () => {
      this.setState({
        addState: false,
        courseAdding: {
          name: "",
          description: "",
        }
      });
      this.fetchEducationObject(false);
    });
  };

  onClickBack = (e) => {
    if (this.state.addState) {
      this.setState({addState: false});
    }
    if (this.state.viewCourseState.showDesc) {
      this.setState({
        viewCourseState: {
          showDesc: false,
          key: null,
        }
      });
    }
  };

  mobileRender() {
    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE} paddingHorizontal={20}
               alignItems="center" paddingVertical={32} marginTop={32}>
        <ProfileImage src={profile.education.logo} size={275} />
        <Flexbox flexDirection="column" paddingTop={16}>
          <Text fontSize={20} fontWeight="bold">{this.state.heading}</Text>
          <Text fontSize={13}
                lineHeight={1.5}>{this.state.text}</Text>
        </Flexbox>
      </Flexbox>
    );
  }

  desktopRender() {
    let courses = this.state.objs;
    let {name, description} = this.state.courseAdding;
    let modalContent = null;

    let coursesList = (
      <Flexbox widthPct={100} heightPct={100}>
        {
          this.props.allowEdit ?
            <div className="buttons-ctn">
              <Icon className="add-button btnHover cursorPointer"
                    src="assets/plus.svg" size={28}
                    onClick={this.onClickAddCourse}/>
            </div> :
            null
        }

        <Flexbox paddingTop={8} paddingLeft={12}>
          <Text fontSize={14} fontWeight={400} lineHeight={0.4}>
            My Favorite Courses
          </Text>
        </Flexbox>

        <Flexbox widthPct={100} paddingTop={10}>
          {
            courses.map((course) => {
              return (
                <Flexbox flexDirection="row" widthPct={100} topBorder
                         alignItems="center" id={course.key}>
                  <Flexbox className="btnHover cursorPointer" paddingHorizontal={16} flexGrow={1} onClick={(e) => {
                    this.onClickCourse(e, course.key)
                  }}>
                    <Text fontWeight={300}>
                      {course.name}
                    </Text>
                  </Flexbox>
                  {
                    this.props.allowEdit ?
                      <Flexbox justifyContent="center" paddingHorizontal={6}
                               alignItems="center" heightPct={100}>
                        <Icon className="btnHover cursorPointer"
                              src="assets/delete.svg" size={24}
                              onClick={(e) => {
                                this.onClickDeleteCourse(e, course.key)
                              }}/>
                      </Flexbox> :
                      null
                  }
                </Flexbox>
              );
            })
          }
        </Flexbox>
      </Flexbox>
    );

    let addCourse = (
      <Flexbox widthPct={100} heightPct={100}>
        <div className="buttons-ctn">
          <Icon className="back-button btnHover cursorPointer"
                src="assets/keyboard-backspace.svg" size={28}
                onClick={this.onClickBack}/>
        </div>

        <Flexbox className="border-box" widthPct={100} paddingTop={40}
                 paddingHorizontal={16}>
          <Flexbox paddingBottom={8} widthPct={100}>
            <TextInput color={CSSColor.MODAL_TEXT}
                       onChange={this.onChangeCourseName}
                       value={name} label="Course Name" fontSize={14}/>
          </Flexbox>
          <Flexbox paddingTop={8} widthPct={100}>
            <TextInput onChange={this.onChangeCourseDesc} rows={15}
                       value={description} textarea
                       label="Course Description"/>
          </Flexbox>
        </Flexbox>
        <Flexbox className="border-box" flexDirection="row" widthPct={100}
                 justifyContent="flex-end" autoMarginTop paddingVertical={16}
                 paddingHorizontal={16}>
          <Button label="Save" fontSize={14} lineHeight={0.5}
                  onClick={this.onClickSaveCourseButton}/>
        </Flexbox>
      </Flexbox>
    );

    let currViewedCourse =
      this.state.objs.find((val) => val.key === this.state.viewCourseState.key);
    let currViewedCourseDesc =
      currViewedCourse ? currViewedCourse.description : "";
    let currViewedCourseName =
      currViewedCourse ? currViewedCourse.name : "";
    let courseDesc = (
      <Flexbox widthPct={100} heightPct={100}>
        <div className="buttons-ctn">
          <Icon className="back-button btnHover cursorPointer"
                src="assets/keyboard-backspace.svg" size={28}
                onClick={this.onClickBack}/>
        </div>
        <Flexbox paddingTop={40} paddingHorizontal={16}>
          <Text fontWeight="bold" fontSize={14}>{currViewedCourseName}</Text>
          <Text
            color={CSSColor.MODAL_TEXT}>
            {currViewedCourseDesc}
          </Text>
        </Flexbox>
      </Flexbox>
    );

    if (this.state.addState) {
      modalContent = addCourse;
    } else if (this.state.viewCourseState.showDesc) {
      modalContent = courseDesc;
    } else {
      modalContent = coursesList;
    }

    return (
      <Flexbox backgroundColor={CSSColor.LIGHT_WHITE} widthPct={100}
               alignItems="center" paddingVertical={64} marginTop={32}>
        <Modal show={this.state.showModal} onBackdropClick={this.closeModal}
               maxWidth={400} minHeight={420} maxHeight={500} minWidth={400}
               paddingAll={0}>
          {modalContent}
        </Modal>

        <Flexbox className="overflow-wrap" width={1000}
                 flexDirection="row" alignItems="center"
                 justifyContent="center">
          <Flexbox paddingHorizontal={32} alignItems="center">
            <ProfileImage src={profile.education.logo} size={275}/>
          </Flexbox>
          <Flexbox flexDirection="column" flexGrow={1}>
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
                           value={this.state.text} rows={8}
                           onChange={this.onChangeText} fillHeight/> :
                <Text fontSize={13}
                      lineHeight={1.5}>{this.state.text}</Text>
            }

            <Text
              className={`cursorPointer unselectable ${this.state.btnHover}`}
              fontSize={14} onClick={this.onClickFaveCourses} lineHeight={0.2}>
              Click here to see my favorite courses at UC San Diego
            </Text>
          </Flexbox>
        </Flexbox>
        {
          this.props.allowEdit ?
            <Flexbox paddingTop={32}>
              <Button label="Update Education" fontSize={18}
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

Education.propTypes = {
  loggedIn: PropTypes.bool,
  allowEdit: PropTypes.bool,
};

export default Education;