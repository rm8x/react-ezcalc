import React, { Component } from 'react';
import styled from 'styled-components';
import { Column as RebassColumn, Box, Flex} from 'rebass';

export const ColumnBase = styled(RebassColumn)`
`;

export const ColumnBankWrapper = styled(Flex)`
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
`;

export const Column = styled(RebassColumn)`
    justify-content: center;
    width: 100%;
`;