import React from 'react';
import styled from 'styled-components';
import { Row as RebassRow } from 'rebass';

export const RowBase = styled(RebassRow)`
    margin-left: auto;
    margin-right: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
    justify-content: center;
    align-items: center;
`;

export const Row = (props) => <RowBase {...props} />