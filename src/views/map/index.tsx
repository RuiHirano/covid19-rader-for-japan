
import React, { useEffect } from 'react';
import { HarmoVisLayers, Container, BasedProps, BasedState, connectToHarmowareVis, MovesLayer, Movesbase, MovesbaseOperation, DepotsLayer, DepotsData } from 'harmoware-vis';
import { useSelector, connect } from 'react-redux';
import { ReduxState } from '../../redux/module';
import { PrefData, Data, StatData } from '../../types';
import MainLayout from '../../layouts';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN ? process.env.REACT_APP_MAPBOX_TOKEN : "";

const createDepotsData = (lngBase: number, latBase: number): DepotsData => {
    const lon = lngBase + (Math.floor(Math.random() * 299999) / 1000000);
    const lat = latBase + (Math.floor(Math.random() * 199999) / 1000000);
    return {
        position: [lon, lat, 0],
    };
}

const createDepotsDataList = (statsData: StatData[], prefsData: PrefData[]): DepotsData[] => {
    let dataList: DepotsData[] = []
    const lastDate = statsData[statsData.length - 1].Date

    statsData.forEach((statData) => {
        let prefData: PrefData = { Longitude: "0", Latitude: "0", NameEn: "", NameJa: "", Id: 0, Regions: "" }
        prefsData.forEach((pref) => {
            if (statData.Prefecture.indexOf(pref.NameJa) !== -1) {
                prefData = pref
            }
        })
        if (statData.Date === lastDate) {
            dataList = dataList.concat(Array.from({ length: statData.TotalCases }, (): DepotsData => createDepotsData(parseFloat(prefData.Longitude), parseFloat(prefData.Latitude))))
        }
    })

    console.log("dataList", dataList, prefsData)
    return dataList
}

/*const Map: React.FC<BasedProps & BasedState> = (props) => {
    const { actions, depotsData, viewport } = props
    const prefsData = useSelector((state: ReduxState) => state.Data.PrefsData)

    useEffect(() => {
        if (actions) {
            actions.setDepotsBase(createDepotsDataList(prefsData))
            actions.setViewport({
                ...viewport,
                width: window.screen.width,
                height: window.screen.height,
                zoom: 3
            })
            actions.setSecPerHour(1000);
        }
    }, [])

    if (actions === undefined || viewport === undefined
        || depotsData === undefined) {
        return <div />
    }

    return (
        <Container>
            <div className="harmovis_area">
                <HarmoVisLayers
                    viewport={viewport} actions={actions}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    layers={[
                        new DepotsLayer({
                            depotsData,
                            iconChange: false,
                            layerRadiusScale: 30
                        }),
                    ]}
                />
            </div>
        </Container>
    );
}*/

interface Props {
    data: Data
}
class Map extends Container<BasedProps & Props> {
    constructor(props: BasedProps & Props) {
        super(props);
    }

    componentDidMount() {
        const prefsData = this.props.data.PrefsData
        const statsData = this.props.data.StatsData

        console.log(process.env);
        const { actions } = this.props;
        if (actions) {
            actions.setDepotsBase(createDepotsDataList(statsData, prefsData))
            actions.setViewport({
                ...this.props.viewport,
                width: window.screen.width,
                height: window.screen.height,
                zoom: 3
            })
            actions.setSecPerHour(1000);
        }
    }

    render() {
        const { actions, depotsData, viewport } = this.props;

        return (
            <MainLayout title={"新型コロナウィルス最新速報"}>

                <div className="harmovis_area">
                    <HarmoVisLayers
                        viewport={viewport} actions={actions}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        layers={[
                            new DepotsLayer({
                                depotsData,
                                iconChange: false,
                                layerRadiusScale: 20
                            }),
                        ]}
                    />
                </div>
            </MainLayout>
        );
    }
}

function mapStateToProps(state: any) {
    console.log("state: ", state)
    return {
        data: { ...state.Data },
    };
}

export default connectToHarmowareVis(connect(
    mapStateToProps,
    null
)(Map));