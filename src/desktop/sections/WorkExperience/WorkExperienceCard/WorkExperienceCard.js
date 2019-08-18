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
import TextInput from "../../../components/TextInput";


class WorkExperienceCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
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

  onClickDoneButton = (e) => {
    this.closeModal();
  };

  onChangeDescription = (e, val) => {
    if (this.props.onChangeDescription) {
      this.props.onChangeDescription(e, val, this.props.dbKey);
    }
  };

  onChangeTechUsed = (e, val) => {
    if (this.props.onChangeTechUsed) {
      this.props.onChangeTechUsed(e, val, this.props.dbKey);
    }
  };

  onSave = (e) => {
    if (this.props.onSave) {
      this.props.onSave(e, this.props.dbKey);
    }
  };

  render() {
    const {name, title, date, description, techUsed, logo} = this.props.workExpObj;
    let header = name + ' - ' + title;
    let subtitle = date;
    let size = "small";

    return (
      <div>
        <Modal size="medium" show={this.state.showModal}
               onBackdropClick={this.closeModal}>
          <Flexbox heightPct={100} widthPct={100}
                   minHeight={Modal.modalSizes[size].height}
                   minWidth={Modal.modalSizes[size].width}>
            <HeaderText title={header} subtitle={subtitle}/>
            {
              this.props.allowEdit ?
                <TextInput color={CSSColor.MODAL_TEXT} value={description}
                           textarea minWidth={640} label="Description"
                           rows={17} onChange={this.onChangeDescription}/> :
                <Text color={CSSColor.MODAL_TEXT}
                      fontSize={12}>{description}</Text>
            }

            <Flexbox widthPct={100} heightPct={100}
                     justifyContent="flex-end">
              {
                this.props.allowEdit ?
                  <TextInput value={techUsed} fontWeight="bold"
                             lineHeight={0.4}
                             onChange={this.onChangeTechUsed}
                             label="Technologies"/>
                  :
                  <Flexbox className="btnHover">
                    <Text fontWeight={500} lineHeight={0.4}>{techUsed}</Text>
                  </Flexbox>
              }
            </Flexbox>

            <Flexbox widthPct={100} autoMarginTop flexDirection="row"
                     justifyContent="flex-end">
              {
                this.props.allowEdit ?
                  <Button label="Save" fontSize={14} lineHeight={0.5}
                          paddingHorizontal={8}
                          onClick={this.onSave}/> :
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
  allowEdit: PropTypes.bool,
  onChangeDescription: PropTypes.func,
  onChangeTechUsed: PropTypes.func,
  onSave: PropTypes.func,
};


export default WorkExperienceCard;