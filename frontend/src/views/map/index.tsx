import React, { useEffect } from 'react';
import {
    HarmoVisLayers, connectToHarmowareVis, LoadingIcon, MovesLayer, BasedProps, Viewport, Movesbase, MovesbaseOperation
} from 'harmoware-vis';
import MainLayout from '../../layouts';
import { Typography } from '@material-ui/core';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN

const createMovesBase = (): Movesbase => {
    const interval = 1000;
    const repeat = 20;
    const departuretime = 1551575400;
    const arrivaltime = departuretime + interval * repeat;

    const operation = Array.from({ length: repeat }, (_, i): MovesbaseOperation => {
        const lon = 136.7 + (Math.floor(Math.random() * 299999) / 1000000);
        const lat = 35.1 + (Math.floor(Math.random() * 199999) / 1000000);
        return {
            position: [lon, lat, 0],
            elapsedtime: departuretime + (i * interval)
        } as MovesbaseOperation;
    });
    return {
        departuretime,
        arrivaltime,
        operation
    };
}


const createMovesBaseList = (count: number): Movesbase[] => {
    return Array.from({ length: count }, (): Movesbase => createMovesBase())
}

const Map: React.FC<BasedProps> = (props) => {
    const { viewport, actions, clickedObject, inputFileName, movesbase, movedData, routePaths } = props
    const optionVisible = false

    useEffect(() => {
        if (actions) {
            actions.setMovesBase(createMovesBaseList(10));
            actions.setViewport({
                ...props.viewport,
                width: window.screen.width,
                height: window.screen.height,
            })
            actions.setSecPerHour(100);
        }
    }, [])

    return (

        <MainLayout title="Harmoware-Vis">
            {actions !== undefined && movesbase !== undefined && viewport !== undefined && routePaths !== undefined && movedData !== undefined && clickedObject !== undefined && clickedObject !== null ?

                <div className="harmovis_area">
                    <HarmoVisLayers
                        viewport={viewport} actions={actions}
                        mapboxApiAccessToken={MAPBOX_TOKEN ? MAPBOX_TOKEN : ''}
                        layers={[
                            new MovesLayer({
                                routePaths, movesbase, movedData,
                                clickedObject, actions, optionVisible
                            }),
                        ]}
                    />
                </div> :
                <LoadingIcon />
            }
        </MainLayout>
    )
}

export default connectToHarmowareVis(Map);
