import React from 'react'
import HighchartsReact from 'highcharts-react-official'

const MapChart = ({ options, highcharts }: any) => <HighchartsReact
    highcharts={highcharts}
    constructorType={'mapChart'}
    options={options}
/>
export default MapChart