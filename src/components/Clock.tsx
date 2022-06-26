import React, { ForwardRefExoticComponent, FunctionComponent } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { timeZone as TTimeZone, TimeZones } from '../constants/timeZones';
import { useClockContext } from '../providers/clock';
import { CitySelector } from './Select';
import { createClock, deleteClock, setupClock } from '../modules/clock/actions';
import { ClockPosition } from '../modules/clock/types';
import { Button } from './Button';

interface Props {
    timeZone?: TTimeZone;
    position: ClockPosition;
    editMode?: boolean;
}

const ClockContainer = styled.div<{ timeZone?: TTimeZone }>`
    display: flex;
    width: 100%;
    background-color: white;
    cursor: ${({timeZone}) => timeZone ? 'grab' : 'pointer'};
    border: 1px solid;
`;

const NewContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 50px;
`;

const City = styled.p`
    margin: 0;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 1.5em;
    text-align: center;
`;

const Time = styled.h3`
    margin: 0;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
`;

const Desc = styled.div`
    > p {
        text-align: center;
    }
`;

const StyledDeleteIcon = styled(ClearIcon)`
    position: absolute;
    top: 0;
    left: 0px;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;

const Timer: FunctionComponent<Required<Props>> = ({ timeZone, position, editMode }) => {
    const [tz, setTz] = React.useState(timeZone);
    const { store, dispatch } = useClockContext();
    const utcTime = store.dateTime.getTime() + (store.dateTime.getTimezoneOffset() * 60000);
    const convertedDate = new Date(utcTime + (TimeZones[tz].offset * 60000));
    const shownTime = `${("0" + convertedDate.getHours()).slice(-2)}:${("0" + convertedDate.getMinutes()).slice(-2)}`;
    const timeDiff = (store.dateTime.getTimezoneOffset() + TimeZones[tz].offset)/60;
    const absoluteHrs = Math.abs(timeDiff);

    const handleChangeTimeZone = (data: TTimeZone) => {
        setTz(data);
    }

    const handleCreate = () => {
        createClock({ timeZone: tz, position }, dispatch);
    }

    return (
        <Container>
            {editMode ? <CitySelector onSelect={handleChangeTimeZone}/> : <City>{tz.split('/')[1]}</City>}
            <Time>{shownTime}</Time>
            <Desc>
                <p>{TimeZones[tz].abbrev}</p>
                <p>{timeDiff === 0 ? '' : Math.abs(timeDiff) > 1 ? `${absoluteHrs} hours` : `${absoluteHrs} hour`} {timeDiff === 0 ? 'Same as' : timeDiff > 0 ? 'ahead' : 'behind'} Manila</p>
            </Desc>
            {editMode && <Button onClick={handleCreate}>SAVE</Button>}
        </Container>
    )
};


const Clock: ForwardRefExoticComponent<Props> = React.forwardRef(({ timeZone, position, editMode, ...others }, ref) => {
    const { dispatch } = useClockContext();

    const handleNewClock = () => {
        setupClock(position, dispatch);
    }
    
    const handleDelete = () => {
        deleteClock(position, dispatch);
    }

    return (
        <ClockContainer ref={ref as React.RefObject<HTMLDivElement>} {...others}>
            { timeZone ? <Timer timeZone={timeZone} editMode={editMode || false} position={position} /> : 
                <NewContainer onClick={handleNewClock}>
                    <AddIcon />
                </NewContainer>
            }
            { timeZone && <StyledDeleteIcon onClick={handleDelete} /> }
        </ClockContainer>
    )
});

export default Clock;