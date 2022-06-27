import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { setDateTime } from '../modules/clock/actions';
import { useClockContext } from '../providers/clock';
import { convertDateTime } from '../helpers/time';
import { DEFAULT_TIMEZONE } from '../constants/timeZones';

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
    color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
`;

const Time = styled.h1`
    margin: 0;
    margin-top: 10px;
    font-size: 5em;
    color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
`;


const MainClock: FunctionComponent = () => {
    const { store, dispatch } = useClockContext();
    const { shownTime } = convertDateTime(store.dateTime, DEFAULT_TIMEZONE);

    useEffect(() => {
        const handleTime = () => {
            setDateTime(dispatch);
        }
        setInterval(handleTime, 900);
    }, [dispatch]);

    return (
        <Container>
            <City>Manila</City>
            <Time>{shownTime}</Time>
        </Container>
    )
}

export default MainClock;