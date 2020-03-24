import React, { useEffect } from 'react';
import {
    HarmoVisLayers, connectToHarmowareVis, LoadingIcon, MovesLayer, BasedProps, Viewport
} from 'harmoware-vis';
import MainLayout from '../../layouts';
import { Typography } from '@material-ui/core';

const MAPBOX_TOKEN: string = process.env.MAPBOX_ACCESS_TOKEN !== undefined ? process.env.MAPBOX_ACCESS_TOKEN : "";

const Map: React.FC<BasedProps> = (props) => {
    const { viewport, actions, routePaths } = props
    const viewport2: Viewport = { latitude: 35.25325, longitude: 136.23414, zoom: 10 }
    useEffect(() => {
        console.log("init: ", viewport, actions)
        if (actions !== undefined) {
            actions.setViewport(viewport2)
        }
    }, [])
    return (

        <MainLayout title="Harmoware-Vis">
            {actions !== undefined ?
                <HarmoVisLayers
                    viewport={viewport2} actions={actions}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    layers={[
                        new MovesLayer({
                            routePaths: [], movesbase: [], movedData: [],
                            clickedObject: [], actions
                        }),
                    ]}
                /> :
                <LoadingIcon />
            }
        </MainLayout>
    )
}

export default connectToHarmowareVis(Map);
