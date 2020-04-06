import React from 'react'
import HighchartsReact from 'highcharts-react-official'

const MapChart = ({ options, highcharts }: any) => <HighchartsReact
    highcharts={highcharts}
    constructorType={'mapChart'}
    containerProps={{ style: { width: "100%", height: "100%" } }}
    options={options}
/>
export default MapChart