import {extendTheme} from '@chakra-ui/react';
import {createBreakpoints} from '@chakra-ui/theme-tools';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontSize: ['12px', '14px'],
        color: 'brand.black',
        background: '#F8F9FE',
        lineHeight: 'base', //tall
        fontFamily: 'Open Sans, sans-serif',
      },
      a: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  colors: {
    brand: {
      main: '#F70000',
      mainAccent: '#9B8F8F',
      brand: '#6E7768',
      black: '#273444',
      white: "#ffffff",
      offWhite: "#E9EBEE"
    },
    button : {
      add: '#5E72E4'
    },
    nav: {
      50 : "#40AB9B"
    },
    core: {
			main: {
				50: "#fffff0",
				100: "#fefcbf",
				200: "#faf089",
				300: "#f6e05e",
				400: "#ecc94b",
				500: "#d69e2e",
				600: "#b7791f",
				700: "#975a16",
				800: "#744210",
				900: "#5F370E",
			  },
			  secondary: {
				background: "#FBF7EF",
				link: "#4A5568",
				card: "#ffffff",
				inputHelper: "#CBD5E0",
			  },
			  navItem: {
				50: "#F7FAFC",
				100: "#EDF2F7",
				400: "#A0AEC0",
				500: "#718096",
				600: "#4A5568",
			  },
		},
  },
  breakpoints: createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
  }),
  fonts: {
    heading: 'Lato, Montserrat, sans-serif',
    body: 'Open Sans, sans-serif',
    mono: 'Roboto, monospace',
  },
  fontWeights: {
    heading: 700,
    bolder: 800,
    boldest: 900,
  },
});
export default theme;
