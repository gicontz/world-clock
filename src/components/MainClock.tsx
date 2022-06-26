import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { setDateTime } from '../modules/clock/actions';
import { useClockContext } from '../providers/clock';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
    margin-bottom: 150px;
`;

const City = styled.p`
    margin: 0;
    font-size: 2em;
`;

const Time = styled.h1`
    margin: 0;
    margin-top: 10px;
    font-size: 5em;
`;


const MainClock: FunctionComponent = () => {
    const { store, dispatch } = useClockContext();

    useEffect(() => {
        const handleTime = () => {
            setDateTime(dispatch);
        }
        setInterval(handleTime, 900);
    }, [dispatch]);

    return (
        <Container>
            <City>Manila</City>
            <Time>{`${("0" + store.dateTime.getHours()).slice(-2)}:${("0" + store.dateTime.getMinutes()).slice(-2)}`}</Time>
        </Container>
    )
}

export default MainClock;