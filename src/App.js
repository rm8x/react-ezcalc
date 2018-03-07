import React, { Component } from 'react';
import './App.css';
import { Box, Provider } from 'rebass';
import GraphingCalculator from './containers/GraphingCalculator';
import theme from './theme'
import * as globals from './globals';

class App extends Component {
  render() {
    return (
      <Provider theme={theme}>
        <Box className="App">
          <GraphingCalculator />
        </Box>
      </Provider>
    );
  }
}

export default App;
