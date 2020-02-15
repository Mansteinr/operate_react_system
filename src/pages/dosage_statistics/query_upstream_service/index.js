import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import Charts from '@/components/Charts'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import {
  getBaseServicesAction
} from '@/common/js/store/actionCreators'
import {
  geServiceChargeInfoAction
} from '@/pages/dosage_statistics/store/actionCreators'
import { renderTableFooter, sortOrderTable } from '@/utils'

class queryUpstreamService extends Component {

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
    mode: 'multiple',
    label: '接口类型',
    field: 'serviceName',
    selectDefault: 'serviceName',
    selectText: 'serviceNameZh',
    placeholder: '请选择接口类型'
  }]

  handleFilter = (param) => {
    if (param.serviceName === '') {
      param.serviceNames  =[]
    } else {
      delete param.serviceName[0]
      param.serviceNames = param.serviceName
    }
    delete param.serviceName
    this.props.geServiceChargeInfoAction(param)
  }

  renderCompanyListChart = () => {
    let { companyList } = this.props, option = {}, xAxisData = [], series = []
    series = [{
      name: '金额',
      type: 'bar',
      data: []
    }, {
      name: '上游调用条数',
      type: 'bar',
      data: []
    }, {
      name: '上游计费条数',
      type: 'bar',
      data: []
    }]
    companyList.map(v => {
      xAxisData.push(v.company)
      series[0].data.push(v.cost)
      series[1].data.push(v.usedCount)
      series[2].data.push(v.chargeUsedCount)
    })
    
    option = {
      type: 'setColumnData',
      title: '上游服务调用占比',
      xAxisData,
      series
    }
    return <Charts option={ option } />
  }
  renderCompanyListTable = () => {
    let data = this.props.companyList,
    columns = [{
      title: '上游公司名称',
      dataIndex: 'company',
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          firstColumns: '总计',
          target: 'company'
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
    }, {
      title: '计费条数',
      dataIndex: 'chargeUsedCount',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'chargeUsedCount')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          target: 'chargeUsedCount'
        })
      }
    }, {
      title: '小视入账',
      dataIndex: 'cost',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'cost')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          target: 'cost'
        })
      }
    }]
    return <TableUI rowKey={'company'} dataSource={ data } columns={ columns } />
  }
  renderCustomerListChart = () => {

    let { customerList } = this.props, option = {}, xAxisData = [], series = []

    series = [{
      name: '金额',
      type: 'bar',
      data: []
    }, {
      name: '上游调用条数',
      type: 'bar',
      data: []
    }, {
      name: '上游计费条数',
      type: 'bar',
      data: []
      }]
    debugger
    customerList.map(v => {
      xAxisData.push(v.loginName)
      series[0].data.push(v.cost)
      series[1].data.push(v.usedCount)
      series[2].data.push(v.chargeUsedCount)
    })
    
    option = {
      type: 'setColumnData',
      title: '下游客户调用占比',
      xAxisData,
      series
    }
    return <Charts option={ option } />
  }
  renderCustomerListTable = () => {
    let data = this.props.customerList,
    columns = [{
      title: '下游客户名称',
      dataIndex: 'customerName',
      render: (value, record, index) => {
        return renderTableFooter({
          value: `${value}(${record.loginName})`,
          data,
          index,
          firstColumns: '总计',
          target: 'customerName'
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
    }, {
      title: '计费条数',
      dataIndex: 'chargeUsedCount',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'chargeUsedCount')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          target: 'chargeUsedCount'
        })
      }
    }, {
      title: '下游计费',
      dataIndex: 'cost',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'cost')
      },
      render: (value, record, index) => {
        return renderTableFooter({
          value: value,
          data,
          index,
          target: 'cost'
        })
      }
    }]
    return <TableUI rowKey={'customerName'} dataSource={ data } columns={ columns } />
  }

  render () {
    let { companyList, customerList } = this.props
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
        <div className="card-space">
          <ContnentUI
            data={ companyList }
            renderChartFun={ this.renderCompanyListChart }
            renderTableFun={ this.renderCompanyListTable } />
        </div>
        <div className="card-space">
          <ContnentUI
            data={ customerList }
            renderChartFun={ this.renderCustomerListChart }
            renderTableFun={ this.renderCustomerListTable } />
        </div>
      </Fragment>
    )
  }

  componentDidMount () {
    this.props.getBaseServicesAction()
  }
}

function mapStateToProps (state) {
  return {
    companyList: state.getIn(['dosageStatistics', 'ServiceChargeInfoList', 'companyList']),
    customerList: state.getIn(['dosageStatistics', 'ServiceChargeInfoList', 'customerList']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBaseServicesAction: () => dispatch(getBaseServicesAction()),
    geServiceChargeInfoAction: (data) => dispatch(geServiceChargeInfoAction(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(queryUpstreamService)