import store from '../../store'
import Charts from '../../components/Charts'
import InquiryUI from '../../components/Inquiry'
import ContnentUI from '../../components/Content'
import React, { Component, Fragment } from 'react'
// import { setLineOpt } from '.../../common/js/myCharts'
import { initQueryindexList } from '../../store/actionCreators'

export default class QueryIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      UsageByDateList: []
    }
    // 监听state变化，新增tab标签栏
    store.subscribe(() => {
      let state = store.getState()
      console.log('subscribe')
      this.setState({
        UsageByDateList: state.UsageByDateList
      })
    })
  }
  // 查询表单
  formList = [{
    type: 'DateRange',
    label: '选择日期',
    field: 'DateRange',
    placeholder: '请选择日期',
    firstName: 'start',
    lastName: 'end',
    formatter: 'YYYY-MM-DD'
  }]

  // 渲染dom
  renderUsageByDateChart = () => {
    console.log('按日期统计')
    let option = {
      title: '总体情况-按日期统计',
      xAxisData: [],
      series: [{
        type: 'line',
        name: '共计使用量',
        data: []
      }, {
        name: '计费使用量',
        type: 'line',
        data: []
      }, {
        name: '消费金额',
        type: 'line',
        data: []
      }]
    }
    this.state.UsageByDateList.forEach(v => {
      option.xAxisData.push(v.dayTime)
      option.series[0].data.push(v.usedCount)
      option.series[1].data.push(v.downChargedCount)
      option.series[2].data.push(Math.floor(v.downCost * 100) / 100)
    })
    return <Charts option={option} />
  }
  // 渲染dom
  renderUsageByDateTable = () => {
    return <Charts />
  }

  // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    const action = initQueryindexList(params)
    store.dispatch(action)
  }

  render() {
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={this.formList} filterSubmit={this.handleFilter} />
        </div>
        {/* 渲染UsageByDate数据 */}
        <div className="card-space">
          <ContnentUI
            data={this.state.UsageByDateList}
            renderChartFun={this.renderUsageByDateChart}
            renderTableFun={this.renderUsageByDateTable} />
        </div>
      </Fragment>
    )
  }
}
