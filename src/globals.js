import { injectGlobal } from 'styled-components';

// from http://www.1001fonts.com/digital+clock-fonts.html
export default injectGlobal`
  @font-face {
    font-family: 'Digital';
    src: url(${require('./assets/fonts/digital-7.regular.ttf')});
  }
`;