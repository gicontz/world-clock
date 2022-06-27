import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import GridLayout, { Layout } from "react-grid-layout";
import MainClock from '../components/MainClock';
import Clock from '../components/Clock';
import { cookies } from '../helpers/cookie';
import { useClockContext } from '../providers/clock';
import 'react-grid-layout/css/styles.css';
import { changeLayout, getAllTimeZones } from '../modules/clock/actions';
import { Actions } from '../modules/clock/types';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { CLOCKS_COOKIE_KEY, THEME_COOKIE_KEY } from '../constants/app';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 96vh;
    background-color: ${({theme}) => theme.app.body.normal.BG_COLOR};
    max-height: 96vh;
    overflow-y: hidden;
`;

const MainView: FunctionComponent = ({...others}) => {
    const { store, dispatch } = useClockContext();
    const [isDarkMode, setDarkMode] = React.useState(store.theme == 'dark');
  
    const toggleDarkMode = (checked: boolean) => {
      setDarkMode(checked);
      cookies.set(THEME_COOKIE_KEY, checked ? 'dark' : 'default');
      dispatch({ type: Actions.SET_THEME, payload: checked ? 'dark' : 'default' });
    };

    const layouts = store.clocks.map(({ timeZone, position: x, editMode }, i) => {
        if (timeZone && !editMode) {
            return { i: i.toString(), x, y: 0, w: 1, h: 7, isBounded: true }
        }
            return { i: i.toString(), x, y: 0, w: 1, h: 7, isBounded: true, static: true }
    });

    const clientWidth = document.documentElement.clientWidth - 40;

    const handleLayoutChange = (layout: Layout[]) => {
        changeLayout(layout, dispatch);
    }
    console.log(store);
    useEffect(() => {
        getAllTimeZones(dispatch);
    }, [dispatch]);

    // useEffect(() => {
    //     // if (store.clocks) cookies.set(CLOCKS_COOKIE_KEY, store.clocks);
    // }, [store.clocks]);

    return (
        <Container>
            <DarkModeSwitch
            style={{ marginBottom: '2rem' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={35}
            />
            <MainClock />
            <GridLayout 
                className="layout"
                cols={4}
                rowHeight={30}
                maxRows={10} 
                width={clientWidth}
                compactType="horizontal"
                layout={layouts}
                isResizable={false}
                isBounded
                onLayoutChange={handleLayoutChange}
                {...others}
            >
                {store.clocks.map(({ timeZone, position, editMode }, i) => {
                    return <Clock key={i} position={position} timeZone={timeZone ? timeZone : undefined} editMode={editMode}/>
                })}
            </GridLayout >
        </Container>
    )
}

export default MainView;