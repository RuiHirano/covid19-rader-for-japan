import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MainLayout from '../../../layouts';
import MapChart from '../../../components/map'
//import mapData from '../../data/mapData'
import mapData from '../../../data/japan-map'
import { CardContent, Divider, CardHeader, Card } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../redux/module';
import { StatData } from '../../../types';

require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)
interface Props {
}

const createData = (statsData: StatData[]) => {
    let result: any[] = []
    if (statsData.length > 0) {
        const lastDate = statsData[statsData.length - 1].Date

        statsData.forEach((stat) => {
            if (stat.Date === lastDate) {
                result.push([stat.Prefecture, stat.TotalCases])
            }
        })
    }
    return result
}



const PatientsMap: React.FC<Props> = props => {
    const statsData = useSelector((state: ReduxState) => state.Data.StatsData)

    const mapOptions = {
        title: {
            text: ''
        },
        colorAxis: {
            min: 0,
            stops: [
                [0, '#EFEFFF'],
                [0.67, '#4444FF'],
                [1, '#000022']
            ]
        },
        tooltip: {

        },
        series: [{
            mapData: mapData,
            dataLabels: {

            },
            name: 'Japan',
            data: createData(statsData)
        }]
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <MapChart options={mapOptions} highcharts={Highcharts} />
        </div>
    );
};

export default PatientsMap;