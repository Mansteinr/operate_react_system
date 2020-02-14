import { connect } from 'react-redux'
import Charts from '@/components/Charts'
import TableUI from '@/components/Table'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import { renderTableFooter, sortOrderTable } from '@/utils'

import {
  getBaseBusinessTypesAction,
  getBaseCustomersAction
} from '@/common/js/store/actionCreators'
import {
  getUsageByNameAction
} from '@/pages/dosage_statistics/store/actionCreators'

class queryDownStreamCustomer extends Component{

  formList =  [{
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
    notRequestService: true,
    selectLable: 'loginName',
    selectDefault: 'customerId',
    selectText: 'customerName',
    placeholder: '请选择客户名称'
  }]

  handleFilter = (param) => {
    console.log(this.porps, param)
    this.props.getUsageByNameAction(param)
  }
  renderUsedCountTable = () => {
    let data = this.props.UsageByNameList,
    columns = [{
      title: '服务名称',
      dataIndex: 'serviceNameZh',
      render: (value, record, index) => {
        return renderTableFooter({
          value: `${value}(${record.serviceName})`,
          data,
          index,
          firstColumns: '总计',
          target: 'serviceNameZh'
        })
      }
    }, {
      title: '计费条数',
      dataIndex: 'downChargedCount',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'downChargedCount')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          target: 'downChargedCount'
        })
      }
    }, {
      title: '总调用条数',
      dataIndex: 'usedCount',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'usedCount')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          target: 'usedCount'
        })
      }
    }]
    return <TableUI rowKey={'serviceNameZh'} dataSource={ data } columns={ columns } />
  }
  renderUsedCountChart = () => {
    let data = this.props.UsageByNameList, pieCount = {}, option = {}
    data.sort((a, b) => {
      return -(a.downChargedCount - b.downChargedCount)
    })

    data.map((v, k) => {
      if (k < 10) {
        pieCount[v.serviceNameZh] = v.downChargedCount
      }
    })
    option = {
      type: 'setRadiiData',
      title: 'Top10各服务计费调用数量占比',
      tipTitle: '计费调用数量',
      obj: pieCount
    }
    return <Charts option={option} />
  }
  renderDownChargedCountTable = () => {
    let data = this.props.UsageByNameList,
    columns = [{
      title: '服务名称',
      dataIndex: 'serviceNameZh',
      render: (value, record, index) => {
        return renderTableFooter({
          value: `${value}(${record.serviceName})`,
          data,
          index,
          firstColumns: '总计',
          target: 'serviceNameZh'
        })
      }
    }, {
      title: '调用金额',
      dataIndex: 'downCost',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'downCost')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          target: 'downCost'
        })
      }
    }]
    return <TableUI rowKey={'serviceNameZh'} dataSource={ data } columns={ columns } />
 

  }
  renderDownChargedCountChart = () => {
    let data = this.props.UsageByNameList, pieCharge = {}, option = {}
    data.sort((a, b) => {
      return -(a.downCost - b.downCost)
    })

    data.map((v, k) => {
      if (k < 10) {
        pieCharge[v.serviceNameZh] = v.downCost
      }
    })
    option = {
      type: 'setRadiiData',
      title: 'Top10各服务调用金额占比',
      tipTitle: '调用金额',
      obj: pieCharge
    }
    return <Charts option={option} />
  }
  render () {
    let { UsageByNameList } = this.props
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
        <div className="card-space">
          <ContnentUI
            data={ UsageByNameList }
            renderTableFun={ this.renderUsedCountTable }
            renderChartFun={ this.renderUsedCountChart }
          />
        </div>
        <div className="card-space">
          <ContnentUI
            data={ UsageByNameList }
            renderTableFun={ this.renderDownChargedCountTable }
            renderChartFun={ this.renderDownChargedCountChart }
          />
        </div>
      </Fragment>
    )
  }

  componentDidMount () {
    let { getBaseBusinessTypesAction, getBaseCustomersAction } = this.props
    getBaseBusinessTypesAction()
    getBaseCustomersAction()
  }
}


function mapStateToProps(state) {
  return {
    UsageByNameList: state.getIn(['dosageStatistics', 'UsageByNameList']),
  }
}

// eslint-disable-next-line no-undef
function mapDispatchToProps(dispatch){
  return {
    getBaseCustomersAction: () => dispatch(getBaseCustomersAction()),
    getUsageByNameAction: (data) => dispatch(getUsageByNameAction(data)),
    getBaseBusinessTypesAction: () => dispatch(getBaseBusinessTypesAction())
  }
}

// eslint-disable-next-line no-undef
export default connect(mapStateToProps, mapDispatchToProps)(queryDownStreamCustomer)
