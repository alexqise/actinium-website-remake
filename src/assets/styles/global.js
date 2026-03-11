import { createGlobalStyle } from 'styled-components';
import colors from './variables/colors';

export default createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
    background: ${colors.bgPrimary};
    color: ${colors.textPrimary};
    line-height: 1.6;
    overflow-x: hidden;
  }

  body, input, button, textarea {
    font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
    font-size: 16px;
  }

  *:focus {
    outline: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
