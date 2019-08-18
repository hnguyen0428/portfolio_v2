import React from 'react';
import ReactComponent from "../../../ReactComponent";
import PropTypes from 'prop-types';
import CSSColor from "../../../../constants/CSSColor";
import Flexbox from "../../../components/Flexbox";
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Text from "../../../components/Text";
import Modal from '../../../components/Modal';
import HeaderText from "../../../components/HeaderText";
import Logger from '../../../../firebase/logger';
import './style.css';

import "../../../../constants/common.css";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";


class ProjectCard extends ReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cls: "project-card project-card-animation",

      // Mobile states,
      expandClass: false,
      expanded: false,
      showExtraContent: false,
    }
  }

  openModal = () => {
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
    this.setState({cls: "project-card project-card-animation"});
  };

  onClickCard = (e) => {
    this.openModal();
    // Remove the animation in order to prevent the card from showing on top
    // of modal
    this.setState({cls: "project-card"});

    const {title} = this.props.projectObj;

    // Log
    Logger.genLog({
      action: 'click_project_card',
      description: 'Visited ' + title + ' Card',
    });
  };

  onClickCardMobile = (e) => {
    if (this.state.expanded) {
      return;
    }

    this.setState({expandClass: true, showExtraContent: true});
    const {title} = this.props.projectObj;

    // Log
    Logger.genLog({
      action: 'click_project_card',
      description: 'Visited ' + title + ' Card',
    });
  };

  onClickDoneButton = (e) => {
    this.closeModal();
  };

  onClickCloseButtonMobile = (e) => {
    e.stopPropagation();
    this.setState({expandClass: false});
  };

  onTransitionEndMobile = (e) => {
    if (e.target.id !== this.props.id) {
      return;
    }

    const {expanded} = this.state;
    if (expanded) {
      this.setState({expanded: !expanded, showExtraContent: false});
    } else {
      this.setState({expanded: !expanded});
    }
  };

  onClickRepoButton = (e) => {
    e.stopPropagation();
  };

  onChangeLongDesc = (e, val) => {
    if (this.props.onChangeLongDesc) {
      this.props.onChangeLongDesc(e, val, this.props.dbKey);
    }
  };

  onChangeShortDesc = (e, val) => {
    if (this.props.onChangeShortDesc) {
      this.props.onChangeShortDesc(e, val, this.props.dbKey);
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

  mobileRender() {
    const {title, shortDesc, longDesc, techUsed, repo} = this.props.projectObj;
    const {expanded, expandClass, showExtraContent} = this.state;
    let cls = expandClass ?
      "project-card-overflow expand-transition expanded-height" :
      "project-card-overflow project-card-mobile expand-transition";

    let extraContent = (
      <Flexbox flexShrink={100}>
        <Text>{longDesc}</Text>
        <Flexbox className="btnHover">
          <Text fontWeight={500} lineHeight={0.4}>{techUsed}</Text>
        </Flexbox>
        <Flexbox widthPct={100} alignItems="flex-end" overflow="hidden">
          <Button label="Close" fontSize={14} lineHeight={0.5}
                  paddingHorizontal={8}
                  onClick={this.onClickCloseButtonMobile}/>
        </Flexbox>
      </Flexbox>
    );

    return (
      <div>
        <Card id={this.props.id} {...this.props} onClick={this.onClickCardMobile}
              className={cls} onTransitionEnd={this.onTransitionEndMobile}>
          <Flexbox widthPct={100} flexShrink={0} flexDirection="row">
            <Text fontWeight="bold">{title}</Text>
            <Flexbox autoMarginLeft>
              <Icon src="assets/github_icon_dark.png" href={repo}
                    target="_blank" size={28} className="btnHover"
                    onClick={this.onClickRepoButton} logClick
                    logDescription={"Visited " + title + " Repo"}/>
            </Flexbox>
          </Flexbox>
          <Flexbox flexShrink={0}>
            <Text>{shortDesc}</Text>
          </Flexbox>

          {
            showExtraContent
              ? extraContent
              :
              <Flexbox className="btnHover">
                <Text fontWeight={500} lineHeight={0.4}>{techUsed}</Text>
              </Flexbox>
          }
        </Card>
      </div>
    );
  }

  desktopRender() {
    const {title, shortDesc, longDesc, techUsed, repo} = this.props.projectObj;
    let size = "small";
    let modalContent = null;
    if (this.props.allowEdit) {
      modalContent = (
        <Flexbox heightPct={100} widthPct={100}
                 minHeight={Modal.modalSizes[size].height}
                 minWidth={Modal.modalSizes[size].width}>
          <HeaderText title={title}/>
          <TextInput color={CSSColor.MODAL_TEXT} textarea minWidth={640}
                     rows={2} onChange={this.onChangeShortDesc}
                     value={shortDesc} label="Short Description"/>
          <TextInput color={CSSColor.MODAL_TEXT} textarea minWidth={640}
                     rows={10} onChange={this.onChangeLongDesc}
                     value={longDesc} label="Long Description"/>
          <TextInput onChange={this.onChangeTechUsed} lineHeight={0.4}
                     value={techUsed} fontWeight="bold" label="Technologies"/>

          <Flexbox widthPct={100} autoMarginTop flexDirection="row"
                   justifyContent="flex-end" alignItems="flex-end">
            {
              this.props.allowEdit ?
                <Button label="Save" fontSize={14} lineHeight={0.5}
                        paddingHorizontal={8}
                        onClick={this.onSave}/> :
                null
            }
            <Button label="Done" fontSize={14} lineHeight={0.5}
                    onClick={this.onClickDoneButton}/>
          </Flexbox>
        </Flexbox>
      );
    } else {
      modalContent = (
        <Flexbox heightPct={100} widthPct={100}
                 minHeight={Modal.modalSizes[size].height}
                 minWidth={Modal.modalSizes[size].width}>
          <HeaderText title={title}/>
          <Text color={CSSColor.MODAL_TEXT}>{longDesc}</Text>

          <Flexbox widthPct={100} autoMarginTop flexDirection="row"
                   justifyContent="flex-end" alignItems="flex-end">
            <Button label="Done" fontSize={14} lineHeight={0.5}
                    onClick={this.onClickDoneButton}/>
          </Flexbox>
        </Flexbox>
      );
    }

    return (
      <div>
        <Modal size={size} show={this.state.showModal}
               onBackdropClick={this.closeModal}>
          {modalContent}
        </Modal>
        <Card {...this.props} onClick={this.onClickCard}
              className={this.state.cls}>
          <Flexbox heightPct={100}>
            <Flexbox widthPct={100} flexDirection="row">
              <Text fontWeight="bold">{title}</Text>
              <Flexbox autoMarginLeft>
                <Icon src="assets/github_icon_dark.png" href={repo}
                      target="_blank" size={28} className="btnHover"
                      onClick={this.onClickRepoButton} logClick
                      logDescription={"Visited " + title + " Repo"}/>
              </Flexbox>
            </Flexbox>
            <Text>{shortDesc}</Text>
            <Flexbox autoMarginTop className="btnHover">
              <Text fontWeight={500} lineHeight={0.4}>{techUsed}</Text>
            </Flexbox>
          </Flexbox>
        </Card>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  id: PropTypes.string,
  dbKey: PropTypes.string,
  projectObj: PropTypes.shape({
    title: PropTypes.string,
    shortDesc: PropTypes.string,
    longDesc: PropTypes.string,
    techUsed: PropTypes.string,
    repo: PropTypes.string,
  }).isRequired,
  ...Card.propTypes,
  allowEdit: PropTypes.bool,
  onChangeLongDesc: PropTypes.func,
  onChangeShortDesc: PropTypes.func,
  onChangeTechUsed: PropTypes.func,
  onSave: PropTypes.func,
};


export default ProjectCard;