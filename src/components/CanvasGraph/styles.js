import React from 'react';
import styled from 'styled-components';
import {  Box } from 'rebass';

export const CanvasWrapper = (props) => <BaseCanvas {...props} />

const BaseCanvas = styled(Box)`
    overflow: hidden;
    background-color: beige;
    border: 8px solid white;
    border-radius: 8px;
    padding-right: 0px;
    margin: 0px;
    margin-left: auto;
    margin-right: auto;
    width: 86%;
    height: 100%;
`;