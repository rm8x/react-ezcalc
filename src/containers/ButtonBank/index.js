import React from 'react';
import Row from '../../components/Row';
import Button from '../../components/Button';
import {Box, Flex, Relative} from 'rebass';
import {Column, ColumnBankWrapper} from './styles';

const ButtonBank = (props) => props.row ? 
    <Row 
        key={props.gridKey}
    >
        {props.symbols.map((s, i) => {
            return  <Button 
                        {...props}
                        onClick={(e) => { 
                            props.onClick(s) 
                        }}
                    >
                    {s}
                    </Button>
        })}
    </Row>
  : 
    <ColumnBankWrapper key={props.gridKey}>{props.symbols.map((s, i) => {
        return  <Button onClick={(e) => { props.onClick(s) }}>{s}</Button>
    })}
    </ColumnBankWrapper>


  export default ButtonBank;