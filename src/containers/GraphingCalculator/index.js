import React, { Component } from 'react';
import math from 'mathjs';
import '../../App.css';
import { Grid, Column, Box, Flex, Relative, Absolute} from 'rebass';
import { CalculatorShape}  from './styles';
import CanvasGraph from '../../components/CanvasGraph';
import Row from '../../components/Row';
import Button from '../../components/Button';

import ButtonBanksGridLayout from '../ButtonBanksGridLayout';
import DigitButtonBank from '../DigitButtonBank';
import ButtonBank from '../ButtonBank';

class GraphingCalculator extends Component {
    constructor(props){
      super(props);
      this.state = {
        display: '0',
        equation: 0,
      }
    }
  
    calculate = () => {
      console.log('calculating ', this.state.display);
      try {
        let result = math.eval(this.state.display);
        this.setState({
          display: result
        })
      } catch (error) {
        this.setState({
          display: '0'
        })
      } 
    }
  
    handleOnTestGraph = (symbol) => {
      this.setState({
        isGraphMode: !this.state.isGraphMode,
        equation: (x) => {
          try {
            let fOfX = math.eval(this.state.display, {x});
            return fOfX; 
          } catch (error) {
            console.log('Ignoring incomplete expression.');
          }
        }
      })
    }

    shouldReplacePlaceholderSymbol = (symbol) => {
      return (this.state.display === '0' || this.state.display === 0)
    }
  
    shouldIgnoreSymbol = (symbol) => {
      return ((this.state.display === '0') && (symbol == 0))
    }
  
    handleSymbolLiteralOnClick = (symbol) => {
        if(!this.shouldIgnoreSymbol(symbol)) {
          if(!this.shouldReplacePlaceholderSymbol(symbol)) {
            this.setState({
              display: this.state.display + symbol
            })
          } else {
            this.setState({
              display: symbol
            })
          }
        }
    }
  
    handleSquareRootOnClick = (symbol) => {
      this.setState({
        display:  `${symbol}(${this.state.display})`
      })
    }
  
    handleClearOnClick = (symbol) => {
      this.setState({
        display: '0',
      })
    }

    render() {
      return (
          <CalculatorShape  width={"100%" }>
            <Box 
            width={"100%" }
            mt={20} mb={10} 
            >
            <CanvasGraph 
              height={200} 
              width={300}
              MaxX={20}
              MinX={-20}
              equation={this.state.equation}
              textToDisplay={this.state.isGraphMode ? 'y =  ' +this.state.display : this.state.display}
              isGraphMode={this.state.isGraphMode} 
              />
            </Box>
            <Box>
            <ButtonBanksGridLayout  
                draggableCancel=".button"
                onClick={this.handleSymbolLiteralOnClick}
                items= {[
                  {
                    component:
                      <Button 
                      className="button" 
                      backgroundColor="teal" 
                      onClick={() => {this.handleOnTestGraph('y=')}}
                      >
                      y=
                      </Button>
                    ,
                    w: 7, 
                    h: 4,
                  },
                  {
                    w: 24, 
                    h: 4,
                    component:
                    <ButtonBank 
                      row secondary 
                      symbols={['sin', 'cos', 'tan']}
                      onClick={this.handleSymbolLiteralOnClick} 
                    />
                  },
                  {
                      w: 12, 
                      h: 10,
                      component: <DigitButtonBank onClick={this.handleSymbolLiteralOnClick} />
                  },
                  {
                    w: 8, 
                    h: 4,
                    component: <ButtonBank 
                                symbols={['(', ')']} row onClick={this.handleSymbolLiteralOnClick}
                                />
                },
                {
                  w: 10, 
                  h: 4,
                  component: <ButtonBank row symbols={['0', '.']} onClick={this.handleSymbolLiteralOnClick} />
                },
                {
                  w: 24, 
                  h: 4,
                  component: <ButtonBank row symbols={['^', '*', '/', '+', '-']} onClick={this.handleSymbolLiteralOnClick} />
                },
              {
                w: 7, 
                h: 4,
                component: <Button onClick={() => {this.handleClearOnClick()}}>C</Button>
              },
              {
                w: 7, 
                h: 4,
                component: <Button 
                              backgroundColor="teal"
                              onClick={() => {this.calculate()}}>=</Button>
              },
              {
                w: 8, 
                h: 6,
                component: <ButtonBank symbols={['x', 'sqrt']} onClick={this.handleSymbolLiteralOnClick} />
              }
              ]}
            />
          </Box>
          </CalculatorShape>
      );
    }
  }
  
  export default GraphingCalculator;