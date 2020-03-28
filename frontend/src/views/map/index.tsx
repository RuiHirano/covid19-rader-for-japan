import React, { useEffect } from 'react';
import {
    HarmoVisLayers, connectToHarmowareVis, LoadingIcon, MovesLayer, BasedProps, Viewport, Movesbase, MovesbaseOperation, BasedState, MovedData
} from 'harmoware-vis';
import MainLayout from '../../layouts';
import { Typography } from '@material-ui/core';

//const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN
const MAPBOX_TOKEN = 'pk.eyJ1IjoicnVpaGlyYW5vIiwiYSI6ImNrODV5cWRrbDBiYmkzbW83MHB0OXR2YWsifQ.DsQnn_9ZQY8-wp0elf-Yhw'
console.log("map: ", MAPBOX_TOKEN)

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

const Map: React.FC<BasedProps & BasedState> = (props) => {
    const { viewport, actions, clickedObject, inputFileName, movesbase, movedData, routePaths }: any = props
    const optionVisible = false

    useEffect(() => {

        const setMovesbase: Movesbase[] = [];
        setMovesbase.push({
            type: "",
            departuretime: 0,
            arrivaltime: 0,
            operation: [{
                elapsedtime: 0,
                position: [135.23415, 35.363453, 0],
            }]
        });

        if (actions) {
            actions.setMovesBase(createMovesBaseList(10));
            actions.setViewport({
                ...props.viewport,
                width: window.screen.width,
                height: window.screen.height,
            })
            actions.setSecPerHour(100);

            actions.updateMovesBase(setMovesbase);
            console.log("test2", actions, movesbase, viewport, routePaths, movedData, clickedObject, clickedObject)

            actions.setViewport({ longitude: 135.35463, latitude: 35.23452345 })
        }

    }, [])

    useEffect(() => {
        console.log("test3", actions, movesbase, viewport, routePaths, movedData, clickedObject, clickedObject)
    }, [movesbase])
    console.log("test", actions, movesbase, viewport, routePaths, movedData, clickedObject, clickedObject)

    return (

        <MainLayout title="Harmoware-Vis">
            {actions !== undefined ?

                <div style={{ position: "fixed", paddingTop: 0, width: "100%", height: "100%" }}>
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
                <div>

                    <LoadingIcon />
                    <Typography>loading</Typography>
                </div>
            }
        </MainLayout>
    )
}

export default connectToHarmowareVis(Map);
