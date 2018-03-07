import React from 'react';
import styled from 'styled-components';
import {  Button} from 'rebass';

export const BaseButton = styled(Button)`
    border: 1px solid black;
    color: ${props => props.theme.colors.primary || 'white'};
    border-radius:  ${props => props.secondary ? '32px' : '8px'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : props.theme.colors.buttonPrimary};
    height:  ${props => props.secondary ? '30px' : '38px'};
    width: ${props => props.secondary ? '600px' : '100%'};
    cursor: pointer;
   /* font-family: 'Digital'; */

`;

export const StyledButton = (props) => 
    <BaseButton className="button" {...props} onClick={props.onClick}>{props.children}</BaseButton>