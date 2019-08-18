import PropTypes from "prop-types";
import CSSColor from "../../constants/CSSColor";
const stylePropType = require('react-style-proptype');


export default class CommonProps {
  static get paddings() {
    return {
      paddingVertical: PropTypes.number,
      paddingHorizontal: PropTypes.number,
      paddingLeft: PropTypes.number,
      paddingRight: PropTypes.number,
      paddingTop: PropTypes.number,
      paddingBottom: PropTypes.number,
      paddingAll: PropTypes.number,
    };
  }

  static get margins() {
    return {
      marginVertical: PropTypes.number,
      marginHorizontal: PropTypes.number,
      marginLeft: PropTypes.number,
      marginRight: PropTypes.number,
      marginTop: PropTypes.number,
      marginBottom: PropTypes.number,
      marginAll: PropTypes.number,
      autoMarginTop: PropTypes.bool,
      autoMarginLeft: PropTypes.bool,
      autoMarginBottom: PropTypes.bool,
      autoMarginRight: PropTypes.bool,
    };
  }

  static get alignments() {
    return {
      justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
      alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
      alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
    };
  }

  static get dimensions() {
    return {
      width: PropTypes.number,
      height: PropTypes.number,
      widthPct: PropTypes.number,
      heightPct: PropTypes.number,
      maxHeight: PropTypes.number,
      maxWidth: PropTypes.number,
      minHeight: PropTypes.number,
      minWidth: PropTypes.number,
      autoHeight: PropTypes.bool,
      autoWidth: PropTypes.bool,
    };
  }

  static get borders() {
    return {
      borderColor: PropTypes.string,
      borderWidth: PropTypes.number,
      borderRadius: PropTypes.number,
      topBorder: PropTypes.bool,
      leftBorder: PropTypes.bool,
      bottomBorder: PropTypes.bool,
      rightBorder: PropTypes.bool,
      allBorder: PropTypes.bool,
    };
  }

  static get text() {
    return {
      fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'bolder', 'lighter']),
      lineHeight: PropTypes.number,
      fontSize: PropTypes.number,
      color: PropTypes.string,
    };
  }

  static get links() {
    return {
      href: PropTypes.string,
      target: PropTypes.string,
    };
  }

  static get style() {
    return {
      style: stylePropType,
    };
  }

  static get loggings() {
    return {
      logDescription: PropTypes.string,
      logClick: PropTypes.bool,
      logExtra: PropTypes.object,
    };
  }

  static setDimensions(style, props) {
    if (props.widthPct) {
      style = {...style, width: String(props.widthPct) + '%'};
    }
    if (props.width) {
      style = {...style, width: props.width};
    }
    if (props.heightPct) {
      style = {...style, height: String(props.heightPct) + '%'};
    }
    if (props.height) {
      style = {...style, height: props.height};
    }
    if (props.autoHeight) {
      style = {...style, height: 'auto'};
    }
    if (props.autoWidth) {
      style = {...style, width: 'auto'};
    }
    if (props.maxHeight) {
      style = {...style, maxHeight: props.maxHeight};
    }
    if (props.maxWidth) {
      style = {...style, maxWidth: props.maxWidth};
    }
    if (props.minHeight) {
      style = {...style, minHeight: props.minHeight};
    }
    if (props.minWidth) {
      style = {...style, minWidth: props.minWidth};
    }
    return style;
  }

  static setPaddings(style, props) {
    if (props.paddingAll) {
      style = {...style, paddingTop: props.paddingAll};
      style = {...style, paddingLeft: props.paddingAll};
      style = {...style, paddingBottom: props.paddingAll};
      style = {...style, paddingRight: props.paddingAll};
    }
    if (props.paddingVertical) {
      style = {...style, paddingTop: props.paddingVertical};
      style = {...style, paddingBottom: props.paddingVertical};
    }
    if (props.paddingHorizontal) {
      style = {...style, paddingLeft: props.paddingHorizontal};
      style = {...style, paddingRight: props.paddingHorizontal};
    }
    if (props.paddingTop) {
      style = {...style, paddingTop: props.paddingTop};
    }
    if (props.paddingLeft) {
      style = {...style, paddingLeft: props.paddingLeft};
    }
    if (props.paddingBottom) {
      style = {...style, paddingBottom: props.paddingBottom};
    }
    if (props.paddingRight) {
      style = {...style, paddingRight: props.paddingRight};
    }
    return style;
  }

  static setMargins(style, props) {
    if (props.marginAll) {
      style = {...style, marginTop: props.marginAll};
      style = {...style, marginLeft: props.marginAll};
      style = {...style, marginBottom: props.marginAll};
      style = {...style, marginRight: props.marginAll};
    }
    if (props.marginVertical) {
      style = {...style, marginTop: props.marginVertical};
      style = {...style, marginBottom: props.marginVertical};
    }
    if (props.marginHorizontal) {
      style = {...style, marginLeft: props.marginHorizontal};
      style = {...style, marginRight: props.marginHorizontal};
    }
    if (props.marginTop) {
      style = {...style, marginTop: props.marginTop};
    }
    if (props.marginLeft) {
      style = {...style, marginLeft: props.marginLeft};
    }
    if (props.marginBottom) {
      style = {...style, marginBottom: props.marginBottom};
    }
    if (props.marginRight) {
      style = {...style, marginRight: props.marginRight};
    }
    if (props.autoMarginTop) {
      style = {...style, marginTop: 'auto'};
    }
    if (props.autoMarginLeft) {
      style = {...style, marginLeft: 'auto'};
    }
    if (props.autoMarginBottom) {
      style = {...style, marginBottom: 'auto'};
    }
    if (props.autoMarginRight) {
      style = {...style, marginRight: 'auto'};
    }
    return style;
  }

  static setBorders(style, props) {
    const {topBorder, leftBorder, bottomBorder, rightBorder, allBorder} = props;
    let hasBorder = topBorder || leftBorder || bottomBorder || rightBorder || allBorder;
    if (!hasBorder) {
      return style;
    }

    let borderColor = props.borderColor || CSSColor.GRAY_20;
    let borderWidth = props.borderWidth || 1;
    let borderRadius = props.borderRadius || 0;
    style = {
      ...style,
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderRadius: borderRadius,
    };
    if (topBorder) {
      style = {...style, borderTopStyle: 'solid'};
    }
    if (leftBorder) {
      style = {...style, borderLeftStyle: 'solid'};
    }
    if (bottomBorder) {
      style = {...style, borderBottomStyle: 'solid'};
    }
    if (rightBorder) {
      style = {...style, borderRightStyle: 'solid'};
    }
    if (allBorder) {
      style = {...style, borderStyle: 'solid'};
    }
    return style;
  }

  static setTextStyleOrDefault(style, props) {
    let fontSize = props.fontSize ? String(props.fontSize) + 'pt' : null;
    let fontColor = CSSColor.PRIMARY_TEXT;
    if (props.color) {
      if (props.color === 'secondary') {
        fontColor = CSSColor.SECONDARY_TEXT;
      } else if (props.color === 'primary') {
        fontColor = CSSColor.PRIMARY_TEXT;
      } else {
        fontColor = props.color;
      }
    }

    return {
      ...style,
      fontWeight: props.fontWeight || 400,
      fontSize: fontSize || '12pt',
      lineHeight: props.lineHeight || 1.2,
      color: fontColor,
    };
  }

  static setTextStyle(style, props) {
    if (props.fontWeight) {
      style = {...style, fontWeight: props.fontWeight};
    }
    if (props.fontSize) {
      style = {...style, fontSize: props.fontSize};
    }
    if (props.lineHeight) {
      style = {...style, lineHeight: props.lineHeight};
    }
    if (props.color) {
      if (props.color === 'primary') {
        style = {...style, color: CSSColor.PRIMARY_TEXT};
      } else if (props.color === 'secondary') {
        style = {...style, color: CSSColor.SECONDARY_TEXT}
      } else {
        style = {...style, color: props.color};
      }
    }
    return style;
  }
}