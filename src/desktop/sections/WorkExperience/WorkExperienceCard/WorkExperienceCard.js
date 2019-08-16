import React from 'react';
import PropTypes from 'prop-types';
import CSSColor from "../../../../constants/CSSColor";
import Flexbox from "../../../components/Flexbox";
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Image from '../../../components/Image';
import Text from "../../../components/Text";
import Modal from '../../../components/Modal';
import HeaderText from "../../../components/HeaderText";
import Logger from '../../../../firebase/logger';
import './style.css';
import {fetchLoginState} from "../../../../firebase/auth";
import {
  fetchWorkExperienceText,
  updateWorkExperienceContent
} from "../../../../firebase/profile";
import {getEditMode} from "../../../common/utils";
import TextInput from "../../../components/TextInput";


class WorkExperienceCard extends React.Component {
  constructor(props) {
    super(props);

    let edit = getEditMode();
    this.state = {
      showModal: false,
      obj: this.props.workExpObj,
      loggedIn: false,
      edit: edit,
    }
  }

  openModal = () => {
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  onClickCard = (e) => {
    this.openModal();

    const {name} = this.props.workExpObj;

    // Log
    Logger.genLog({
      action: 'click_work_experience_card',
      description: 'Visited ' + name + ' Card',
    })
  };

  onChangeText = (e, val) => {
    this.setState({
      obj: {
        ...this.state.obj,
        description: val,
      }
    });
  };

  onClickSaveButton = (e) => {
    // Update About Me info
    updateWorkExperienceContent(this.state.obj, this.props.dbKey, () => {
    }, (error) => {
      alert('Error updating work experience card.');
    });
  };

  onClickDoneButton = (e) => {
    this.closeModal();
  };

  componentWillMount() {
    fetchLoginState((loggedIn) => this.setState({loggedIn: loggedIn}));
    fetchWorkExperienceText((obj) => {
      this.setState({
        objs: obj.objs || this.state.objs,
      });
    });
  }

  render() {
    const {name, title, date, description, techUsed, logo} = this.state.obj;
    let header = name + ' - ' + title;
    let subtitle = date;

    return (
      <div>
        <Modal size="medium" show={this.state.showModal}
               onBackdropClick={this.closeModal}>
          <Flexbox heightPct={100} widthPct={100}>
            <HeaderText title={header} subtitle={subtitle}/>
            {
              this.state.loggedIn && this.state.edit ?
                <TextInput color={CSSColor.MODAL_TEXT} value={description}
                           textarea minWidth={640}
                           rows={17} onChange={this.onChangeText}/> :
                <Text color={CSSColor.MODAL_TEXT}
                      fontSize={12}>{description}</Text>
            }

            <Flexbox widthPct={100} heightPct={100} autoMarginTop
                     flexDirection="row" alignItems="flex-end">
              <HeaderText title={techUsed} subtitle={"Technologies Used:"}
                          type="title_below" titleSize={12}
                          subtitleSize={12}/>
            </Flexbox>

            <Flexbox widthPct={100} autoMarginTop flexDirection="row"
                     justifyContent="flex-end">
              {
                this.state.loggedIn && this.state.edit ?
                  <Button label="Save" fontSize={14} lineHeight={0.5}
                          paddingHorizontal={8}
                          onClick={this.onClickSaveButton}/> :
                  null
              }
              <Button label="Done" fontSize={14} lineHeight={0.5}
                      paddingHorizontal={8}
                      onClick={this.onClickDoneButton}/>
            </Flexbox>
          </Flexbox>
        </Modal>
        <Card {...this.props} className="work-exp-card"
              onClick={this.onClickCard}>
          <Flexbox>
            <Image src={logo}/>
          </Flexbox>
        </Card>
      </div>
    );
  }
}

WorkExperienceCard.propTypes = {
  dbKey: PropTypes.string,
  workExpObj: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    techUsed: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
  ...Card.propTypes,
};


export default WorkExperienceCard;