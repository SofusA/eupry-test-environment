import React from 'react'
import Loadable from '@loadable/component'

const ComponentWithChart = ({ options, series }) => (

  <>
    <LoadableChart  
        options={options} 
        series={series} 
        type="line"
        height="350"
    />
  </>
)

export default ComponentWithChart

// import react-apexcharts here
const LoadableChart = Loadable(() => import('../../node_modules/react-apexcharts/src/react-apexcharts'))
