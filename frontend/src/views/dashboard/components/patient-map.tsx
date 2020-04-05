import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MainLayout from '../../../layouts';
import MapChart from '../../../components/map'
//import mapData from '../../data/mapData'
import mapData from '../../../data/japan-map'
import { CardContent, Divider, CardHeader, Card } from '@material-ui/core';

require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)
interface Props {
}

const options: Highcharts.Options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'line',
        data: [1, 2, 3]
    }]
}

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
    chart: {
        width: 300,
        height: 300
    },
    tooltip: {

    },
    series: [{
        mapData: mapData,
        dataLabels: {

        },
        name: 'Japan',
        data: [
            ['jp-hs', 20],
            ['jp-yc', 50],
            ['no-ho', 2],
            ['no-sf', 42],
            ['no-va', 4],
            ['no-of', 5],
            ['no-nt', 6],
            ['no-ro', 7],
            ['no-bu', 8],
            ['no-vf', 9],
            ['no-fi', 10],
            ['no-no', 11],
            ['no-tr', 12],
            ['no-ak', 13],
            ['no-op', 14],
            ['no-he', 15],
            ['no-os', 16],
            ['no-te', 17],
            ['no-aa', 18]
        ]
    }]
}

const PatientsMap: React.FC<Props> = props => {

    return (
        <Card>
            <CardHeader
                //action={
                //    <Button size="small" variant="text">
                //        Last 7 days <ArrowDropDownIcon />
                //    </Button>
                //}
                title={`都道府県別の罹患者数の累計`}
            />
            <Divider />
            <CardContent>
                <MapChart options={mapOptions} highcharts={Highcharts} />

            </CardContent>
            <Divider />
            {/*<CardActions className={classes.actions}>
                <Button color="primary" size="small" variant="text">
                    Overview <ArrowRightIcon />
                </Button>
            </CardActions>*/}
        </Card>
    );
};

export default PatientsMap;