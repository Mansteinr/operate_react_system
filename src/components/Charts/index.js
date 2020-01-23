import React, { Component } from 'react'
import { setLineData, renderChart } from '../../common/js/myCharts'
export default class Charts extends Component {

  componentDidMount() {
    // 绘制图表
    renderChart(document.getElementById('chart'), setLineData(this.props.option))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 绘制图表
    return  renderChart(document.getElementById('chart'), setLineData(this.props.option))
  }

  render() {
    return (
      <div id="chart" style={{ width: 400, height: 400 }}></div>
    )
  }
} 