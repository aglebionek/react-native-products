import type { Theme } from "@react-navigation/native";

const highlightPinkLight = '#C33593';
const highlightPinkDark = '#802363';
const highlightGold = '#F4C45D';

export const Colors = {
  light: {
    text: '#cdcdcd',
    backgroundStart: highlightPinkDark,
    backgroundMiddle: highlightPinkDark,
    backgroundEnd: highlightPinkLight,
    borderColor: '#1B2746',
    tabIconDefault: '#1B2746',
    tabIconSelected: highlightGold,
  },
  dark: {
    text: '#cdcdcd',
    backgroundStart: '#2B2746',
    backgroundMiddle: '#221D40',
    backgroundEnd: '#05040C',
    borderColor: highlightPinkDark,
    tabIconDefault: highlightPinkLight,
    tabIconSelected: highlightGold,
  },
};

export const MainThemeColorsDark: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(37, 41, 46)', // primary color for your app, usually your brand color.
    background: 'transparent', // app background color
    card: 'transparent', // app top and bottom bar backgroud color
    text: 'rgb(229, 229, 231)', // app topbar title color
    border: 'rgb(39, 39, 41)', // border color
    notification: 'rgb(255, 69, 58)', // notification color
  },
};

