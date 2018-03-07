import React from 'react';
import Row from '../../components/Row';
import Button from '../../components/Button';
import {Box} from 'rebass';

const DigitButtonBank = (props) =>
<Box pt={1} key={0}>
  <Row >
    <Button onClick={() => { props.onClick('7') }}>7</Button>
    <Button onClick={() => { props.onClick('8') }}>8</Button>
    <Button onClick={() => { props.onClick('9') }}>9</Button>
  </Row>
  <Row >
    <Button onClick={() => { props.onClick('4') }}>4</Button>
    <Button onClick={() => { props.onClick('5') }}>5</Button>
    <Button onClick={() => { props.onClick('6') }}>6</Button>
  </Row>
  <Row >
    <Button onClick={() => { props.onClick('1') }}>1</Button>
    <Button onClick={() => { props.onClick('2') }}>2</Button>
    <Button onClick={() => { props.onClick('3') }}>3</Button>
  </Row>
</Box>
  
  export default DigitButtonBank;