import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import GridLayout, { Layout } from "react-grid-layout";
import MainClock from '../components/MainClock';
import Clock from '../components/Clock';
import { useClockContext } from '../providers/clock';
import 'react-grid-layout/css/styles.css';
import { changeLayout } from '../modules/clock/actions';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const MainView: FunctionComponent = ({...others}) => {
    const { store, dispatch } = useClockContext();
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

    return (
        <Container>
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