import React, { Component } from 'react'
import { setLineData, renderChart } from '../../common/js/myCharts'
export default class Charts extends Component {

  componentDidMount() {
    let echarts = require('echarts'), options = this.props.option
    // 绘制图表
    renderChart(document.getElementById('chart'), setLineData(options))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let echarts = require('echarts'), options = this.props.option
    // 绘制图表
    return  renderChart(document.getElementById('chart'), setLineData(options))
  }

  render() {
    return (
      <div id="chart" style={{ width: 400, height: 400 }}></div>
    )
  }
} 