import styled from 'styled-components';

export const Button = styled.button`
    cursor: pointer;
    background-color: white;
    outline: none;
    border: 1px solid;
    &:active {
        background-color: rgba(200, 200, 200, 0.5);
    }
`;