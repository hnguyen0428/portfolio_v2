import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from "../Flexbox";
import Text from "../Text";


class HeaderText extends React.Component {
  render() {
    let titleSize = this.props.titleSize || 15;
    let subtitleSize = this.props.subtitleSize || 15;

    switch (this.props.type) {
      case 'title_below':
        return (
          <Flexbox>
            {
              this.props.subtitle ?
                <Text lineHeight={0.2} size={subtitleSize}
                      color="secondary">{this.props.subtitle}</Text> :
                null
            }
            <Text fontWeight="bold" size={titleSize}
                  lineHeight={0.4}>{this.props.title}</Text>
          </Flexbox>
        );
      case 'title_above':
      default:
        return (
          <Flexbox>
            <Text fontWeight="bold" size={titleSize}
                  lineHeight={0.4}>{this.props.title}</Text>
            {
              this.props.subtitle ?
                <Text lineHeight={0.2} size={subtitleSize}
                      color="secondary">{this.props.subtitle}</Text> :
                null
            }
          </Flexbox>
        );
    }
  }
}

HeaderText.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleSize: PropTypes.number,
  subtitleSize: PropTypes.number,
  type: PropTypes.oneOf(['title_below', 'title_above']),
};

export default HeaderText;