import React, { Component } from 'react'
import { setLineData, renderChart } from '@/common/js/myCharts'
export default class Charts extends Component {

  componentDidMount () {
    // 绘制图表
    renderChart(this.refs.chart, setLineData(this.props.option))
  }

  render() {
    return (
      <div ref="chart" style={{ width: 400, height: 400 }}></div>
    )
  }
} 