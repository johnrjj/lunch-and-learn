const palette = {
  white: "#ffffff",
  offwhite: "#F7F8FE",
  gray: "#DCDCE3",
  teal: "#4FCACF",
  lightBlue: "#55A0F8",
  darkBlue: "#4756B5",
  black: "#31323B"
};

const colors = {
  primaryTextColor: palette.black,
  contrastTextColor: palette.white,
  calculatorBackgroundColor: palette.white,
  buttonBackgroundColor: `linear-gradient(-90deg, ${palette.teal} 0%, ${
    palette.lightBlue
  } 98%)`,
  labelBackgroundColor: palette.offwhite,
  boxShadow: "0 2px 14px 4px rgba(53, 64, 134, 0.60);"
};

// 1rem = html's font size
// 16px *2 = 32px
const spacing = {
  medium: "2rem", // 32px
  large: "4rem", // 64px
  xlarge: "6rem" // 94px
};

const fontSizing = {
  medium: "2rem",
  large: "3rem",
  xlarge: "4rem"
};

export { colors, spacing, fontSizing };
