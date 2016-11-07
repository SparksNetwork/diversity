import * as theme from '../../style/theme';
import * as vars from '../../style/vars';
import { resetInputCss, resetFontCss } from '../../style/helpers'
import { style, extend } from 'typestyle';

// internal variables
const textInputFontSize = `15px`;
const textInputHeight = `31px`;
const textInputBorderColor = vars.inputBorderColor;

const textInputActiveColor = theme.textInputActiveColor;
const textInputInactiveColor = theme.textInputInactiveColor;

export const uniqueRoot = `sn-input`;

export const root: string = style({
  // display: `inline-block`,
  position: `relative`
});

export const disabled: string = style({
  opacity: 0.5,
  pointerEvents: `none`
});

export const container: string = style({
  display: `inline-block`,
  width: `100%`
});

export const notFloatLabelActive: string = style({
  display: `none`
});

// export const textInput = textInputCss();

export const textInputUnderbar: string = style(
  textInputCss(),
  {
    backgroundColor: `transparent`,
    borderBottom: `1px solid ${textInputBorderColor}`,
    borderRadius: 0
  }
);

export const textInputWebkitPlaceholder = {
  selector: `${uniqueRoot} input.${textInputUnderbar}::-webkit-input-placeholder`,
  object: { color: `transparent` }
};

export const textInputMozPlaceholder = {
  selector: `${uniqueRoot} input.${textInputUnderbar}::-moz-placeholder`,
  object: { color: `transparent` }
};

export const textInputMSPlaceholder = {
  selector: `${uniqueRoot} input.${textInputUnderbar}::-ms-placeholder`,
  object: { color: `transparent` }
};

export const label: string = style(
  {
    color: textInputInactiveColor,
    position: `absolute`,
    left: 0,
    top: `5px`,
    fontSize: textInputFontSize,
    pointerEvents: `none`
  }
);

export const labelActive: string = style(
  {
    color: textInputActiveColor,
    transform: `translate(0, -75%) scale(0.75)`,
    transformOrigin: `top left`,
    transition: `transform 0.1s ease-in, color 0.1s ease-in`
  }
);

export const helper: string = style(
  {
    color: textInputInactiveColor,
    position: `absolute`,
    left: 0,
    bottom: 0,
    fontSize: textInputFontSize,
    transform: `scale(0.75)`,
    transformOrigin: `bottom left`,
  }
);

export const helperError: string = style(
  {
    color: `red`
  }
);

function textInputCss(): NestedCSSProperties {
  return extend(
    inputCss(),
    transparentCss(),
    {
      letterSpacing: vars.letterSpacing,
      width: `100%`,
      boxShadow: vars.boxShadowTextInput,
      color: vars.inputTextColor,
      fontSize: textInputFontSize,
      height: textInputHeight,
      fontWeight: vars.fontWeight
    }
  );
}

function inputCss() {
  return extend(
    resetInputCss(),
    resetFontCss()
  )
}

function transparentCss(): NestedCSSProperties {
  return {
    backgroundColor: `transparent`,
    border: `none`
  };
}
