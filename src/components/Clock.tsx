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
import { convertDateTime } from '../helpers/time';

interface Props {
    timeZone?: TTimeZone;
    position: ClockPosition;
    editMode?: boolean;
}

const ClockContainer = styled.div<{ timeZone?: TTimeZone }>`
    display: flex;
    width: 100%;
    background-color: ${({theme}) => theme.app.body.normal.BG_COLOR};
    cursor: ${({timeZone}) => timeZone ? 'grab' : 'pointer'};
    border: 1px solid ${({theme}) => theme.app.body.normal.BORDER_COLOR};
`;

const NewContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.app.body.normal.BG_COLOR};
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
    color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
`;

const Time = styled.h3`
    margin: 0;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
    color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
`;

const Desc = styled.div`
    > p {
        color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
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

const StyledAddIcon =  styled(AddIcon)`
    color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
`;

const Timer: FunctionComponent<Required<Props>> = ({ timeZone, position, editMode }) => {
    const [tz, setTz] = React.useState(timeZone);
    const { store, dispatch } = useClockContext();

    const handleChangeTimeZone = (data: TTimeZone) => {
        setTz(data);
    }

    const handleCreate = () => {
        createClock({ timeZone: tz, position }, dispatch);
    }

    const { shownTime, timeDiff, absoluteHrs } = convertDateTime(store.dateTime, tz, store.timeZones);

    return (
        <Container>
            {editMode ? <CitySelector onSelect={handleChangeTimeZone}/> : <City>{tz.split('/')[1].replace('_', ' ')}</City>}
            <Time>{shownTime}</Time>
            <Desc>
                <p>{(store.timeZones || TimeZones)[tz].abbrev}</p>
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
                    <StyledAddIcon />
                </NewContainer>
            }
            { timeZone && <StyledDeleteIcon onClick={handleDelete} /> }
        </ClockContainer>
    )
});

export default Clock;