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
import Logger from '../../../../logger/logger';
import './style.css';


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

  render() {
    const {name, title, date, description, techUsed, logo} = this.props.workExpObj;
    let header = name + ' - ' + title;
    let subtitle = date;

    return (
      <div>
        <Modal size="medium" show={this.state.showModal}
               onBackdropClick={this.closeModal}>
          <Flexbox heightPct={100} widthPct={100}>
            <HeaderText title={header} subtitle={subtitle}/>
            <Text color={CSSColor.MODAL_TEXT} size={12}>{description}</Text>

            <Flexbox widthPct={100} heightPct={100} autoMarginTop
                     flexDirection="row" alignItems="flex-end">
              <HeaderText title={techUsed} subtitle={"Technologies Used:"}
                          type="title_below" titleSize={12}
                          subtitleSize={12}/>
            </Flexbox>

            <Flexbox widthPct={100} autoMarginTop flexDirection="row"
                     justifyContent="flex-end">
              <Button label="Done" fontSize={14} lineHeight={0.5}
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