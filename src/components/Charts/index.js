import React, { Component } from 'react'
import { setLineData, renderChart, setRadiiData, setColumnData } from '@/common/js/myCharts'

export default class Charts extends Component {
  componentDidMount () {
    if (this.props.option.type === 'setRadiiData') {
      renderChart(this.refs.chart, setRadiiData(this.props.option))
    } else if (this.props.option.type === 'setColumnData') {
      renderChart(this.refs.chart, setColumnData(this.props.option))
    } else {
      renderChart(this.refs.chart, setLineData(this.props.option))
    }
  }

  render() {
    return (
      <div ref="chart" style={{ width: 400, height: 400 }}></div>
    )
  }
} 