import { connect } from 'react-redux'
import Charts from '@/components/Charts'
import TableUI from '@/components/Table'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import { renderTableFooter, sortOrderTable } from '@/utils'
import {
  getBaseCustomersAction,
  getBaseBusinessTypesAction,
  getBaseServicesAction
} from '@/common/js/store/actionCreators'

import {
  getUsageByDateAction
} from '@/pages/query_index/store/actionCreators'

class queryUsage extends Component{
 
  // 查询表单
  formList = [{
    type: 'DateRange',
    label: '选择日期',
    field: 'DateRange',
    placeholder: '请选择日期',
    firstName: 'start',
    lastName: 'end',
    formatter: 'YYYY-MM-DD'
  }, {
    isAll: true,
    type: 'Select',
    label: '行业类型',
    showSearch: false,
    field: 'businessType',
    selectDefault: 'typeId',
    selectText: 'typeName',
    placeholder: '请选择行业类型'
  }, {
    isAll: true,
    type: 'Select',
    label: '客户名称',
    field: 'loginName',
    selectLable: 'loginName',
    selectDefault: 'customerId',
    selectText: 'customerName',
    placeholder: '请选择客户名称'
  }, {
    type: 'Select',
    label: '接口类型',
    field: 'serviceName',
    selectDefault: 'serviceName',
    selectText: 'serviceNameZh',
    placeholder: '请选择接口类型'
  }]
  
  // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    this.props.getUsageByDateAction(params)
  }

   // 渲染dom
  renderUsageByDateChart = () => {
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
    }, { UsageByDateList } = this.props
    // 组装参数
    UsageByDateList.forEach(v => {
      option.xAxisData.push(v.dayTime)
      option.series[0].data.push(v.usedCount)
      option.series[1].data.push(v.downChargedCount)
      option.series[2].data.push(Math.floor(v.downCost * 100) / 100)
    })
    return <Charts option={option} />
  }

    // 渲染dom
  renderUsageByDateTable = () => {
    const data = this.props.UsageByDateList,
    columns = [{
      title: '使用日期',
      dataIndex: 'dayTime',
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          firstColumns: '总计',
          target: 'dayTime'
        })
      }
    }, {
      title: '共计使用量',
      dataIndex: 'usedCount',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'usedCount')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value,
          data,
          index,
          target: 'usedCount'
        })
      }
    }, {
      title: '计费使用量',
      dataIndex: 'downChargedCount',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'downChargedCount')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value,
          data,
          index,
          target: 'downChargedCount'
        })
      }
    }, {
      title: '消费金额',
      dataIndex: 'downCost',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'downCost')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value,
          data,
          index,
          target: 'downCost',
          toFixed: 4
        })
      }
    }]
    return <TableUI rowKey={'dayTime'} dataSource={ data } columns={ columns } />
  }
  
  render () {
    const { UsageByDateList } = this.props
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
        <div className="card-space">
          <ContnentUI
            data={ UsageByDateList }
            renderChartFun={ this.renderUsageByDateChart }
            renderTableFun={ this.renderUsageByDateTable } />
        </div>
      </Fragment>
    )
  }
  componentDidMount () {
    let {
      getBaseCustomersAction,
      getBaseBusinessTypesAction,
      getBaseServicesAction
    } = this.props
    getBaseBusinessTypesAction()
    getBaseCustomersAction()
    getBaseServicesAction()
  }
}

function mapStateToProps (state) {
  return {
    UsageByDateList: state.getIn(['queryIndex', 'UsageByDateList'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBaseBusinessTypesAction:  () => {
      dispatch(getBaseBusinessTypesAction())
    },
    getBaseCustomersAction:  () => {
      dispatch(getBaseCustomersAction())
    },
    getBaseServicesAction:  () => {
      dispatch(getBaseServicesAction())
    },
    getUsageByDateAction:  (data) => {
      dispatch(getUsageByDateAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(queryUsage)