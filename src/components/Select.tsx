import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { DEFAULT_TIMEZONE, timeZone, TimeZones } from '../constants/timeZones';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useClockContext } from '../providers/clock';

interface Props {
    children?: React.ReactNode;
    value?: string;
}

const SelectContainer = styled.div`
    display: flex;
    width: 100%;
    &:hover {
        > div {
            display: block !important;
        }
    }
`;

const LabelContainer = styled.h4`
    font-size: 1.5em;
    margin: 0;
    margin-bottom: 15px;
    width: 100%;
`;

const OptionsContainer = styled.div`
    display: none;
    &:checked {
        display: none;
    }
    position: absolute;
    background-color: ${({theme}) => theme.app.body.normal.BG_COLOR};
    color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
    padding: 7px;
    width: 150px;
    left: 50%;
    margin-left: -82px;
    margin-top: 1.8rem;
    max-height: 97px;
    font-size: 1.5rem;
    overflow-y: auto;
`;

const Select: FunctionComponent<Props> = ({ children, value, ...others }) => {
    return (
        <SelectContainer {...others}>
            <LabelContainer>{value}<ChevronRightIcon/></LabelContainer>
            <OptionsContainer>
                { children }
            </OptionsContainer>
        </SelectContainer>
    )
};

const Item = styled.div`
    padding: 3px;
`;

const StyledSelect = styled(Select)`
    > h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({theme}) => theme.app.body.normal.TEXT_COLOR};
        > svg {
            display: none;
            transform: rotateZ(90deg);
        }
    }
    &:hover {
        > h4 > svg {
            display: block;
        }
    }
`;

interface CitySelectorProps {
    value?: string;
    onSelect?: (v: timeZone) => void;
}

export const CitySelector: FunctionComponent<CitySelectorProps> = ({value, onSelect, ...others}) => {
    const { store } = useClockContext();
    const tzs = Object.keys(TimeZones);
    const [city, setCity] = React.useState(tzs[0]);

    const handleSelect = (v: timeZone) => () => {
        setCity(v);
        if(typeof onSelect === 'function') onSelect(v);
    }

    return (
        <StyledSelect value={city.split('/')[1].replace('_', ' ')} {...others}>
            {tzs.filter((tz) => tz !== city && store.clocks.findIndex(({ timeZone, editMode }) => tz === timeZone && !editMode) === -1 && tz !== DEFAULT_TIMEZONE).map((k, i) => {
                return (
                    <Item key={i} onClick={handleSelect(k as timeZone)}>{k.split('/')[1].replace('_', ' ')}</Item>
                )
            })}
        </StyledSelect>
    )
}