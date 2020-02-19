/* eslint-disable no-unused-expressions */
import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import LogsModal from '@/components/LogModal'
import React, { Component, Fragment } from 'react'
import { renderTableFooter, sortOrderTable, formaterTime } from '@/utils'
import {
  getBaseCustomersAction,
  getBaseBusinessTypesAction,
  getBaseServicesAction,
  getGuidAction
} from '@/common/js/store/actionCreators'

import {
  getQueryLogsAction
} from '@/pages/operation-tools/store/actionCreators'

class queryLogs extends Component{
  
  state = {
    visible: false
  }

  // 查询表单
  formList = [{
    type: 'DatePicker',
    label: '选择日期',
    field: 'day',
    placeholder: '请选择日期',
    formatter: 'YYYY-MM-DD'
  },{
    type: 'TimePicker',
    label: '开始时间',
    field: 'start',
    initialValue: new Date(+new Date() - 60 * 60 * 1000),
    placeholder: '请选择时间'
  },{
    type: 'TimePicker',
    label: '结束时间',
    field: 'end',
    placeholder: '请选择时间'
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
    isQueryParams: true,
    selectLable: 'serviceName',
    selectDefault: 'serviceId',
    selectText: 'serviceNameZh',
    placeholder: '请选择接口类型'
  }]
  
  // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    let option = {
      start: params.day + ' ' + params.start,
      end: params.day + ' ' + params.end,
      serviceName: params.serviceName,
      params: {}
    }
    if (params.lowerCostTime) {
      option.lowerCostTime = params.lowerCostTime
    }
    if (params.upperCostTime) {
      option.upperCostTime = params.upperCostTime
    }
    document.querySelectorAll('.param-wrapper input').forEach(v => {
      if(v.id === 'lowerCostTime' || v.id === 'upperCostTime') return
      option.params[v.id] = v.value.trim()
    })
    this.props.getQueryLogsAction(option)
  }

  handleClick = (value) => {
    this.props.getGuidAction(value)
    this.setState({
      visible: true
    })
  }

  changeVisible = (visible) => {
    console.log(visible)
    this.setState({
      visible: visible
    })
  }

  renderLogsTable = () => {
    let data = this.props.logsList,
    columns = [{
      title: '用户名',
      dataIndex: 'loginName'
    }, {
      title: 'guid',
      dataIndex: 'guid',
      render: (value, record, index) => <span onClick={() => this.handleClick(value)} className="span-link">{value}</span>
    }, {
      title: '请求时间',
      dataIndex: 'beginTime',
      render: (value, record, index) => formaterTime(value, 'yyyy-mm-dd hh:ii:ss')
    }, {
      title: '请求参数',
      dataIndex: 'param',
      render: (value, record, index) => {
        let spanList = []
        for (let k in value) {
          if (k !== 'guid' && k !== 'image' && k !== 'shaName' && k !== 'shaMobile') {
            spanList.push(<span key={Math.random()} title={`${k}: ${value[k]}`} className="param-item">{`${k}: ${value[k]}`}</span>)
          }
          }
          return spanList
      }
    }, {
      title: '耗时(ms)',
      dataIndex: 'costTime_all',
      sorter: (a, b) => {
        return sortOrderTable(a, b, 'costTime_all')
      }
    }, {
      title: 'RESULT',
      dataIndex: 'rsp.RESULT'
    }, {
      title: 'resultCode',
      dataIndex: 'rsp',
      render: (value, record, index) => value.detail ? value.detail.resultCode : ""
    }, {
      title: 'IP地址',
      dataIndex: 'ip'
    }, {
      title: '渠道',
      dataIndex: 'srcQueryReturnList',
      render: (value, record, index) => {
        let spanList = []
        if (value && value.length > 0) {
          value.forEach(function (v, k) {
            if (v && v.className) {
              v.cn = v.className.split(".")[2]
              spanList.push(<span  key={Math.random()} className="param-item" title={`渠道名称: ${v.cn }  ${v["invokeCostTime"]}`}>{`渠道名称: ${v.cn} ${ v['invokeCostTime']}`}</span>)
            }
          })
        }
        return spanList
      }
    }]
    return <TableUI rowKey={'serviceNameZh'} dataSource={ data } columns={ columns } />
  }
  
  render () {
    let getParamsByServiceNameList = this.props.getParamsByServiceNameList || [], arrList = [{paramName:'lowerCostTime',paramNameCh: '耗时大于'},{paramName:'upperCostTime',paramNameCh: '耗时小于'}],paramsList = [...getParamsByServiceNameList, ...arrList]

    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={this.formList} filterSubmit={this.handleFilter} renderParamsList={ paramsList }/>
        </div>
        <div className="card-space">
          <ContnentUI
            data={ this.props.logsList }
            renderTableFun={ this.renderLogsTable }
          />
        </div>
        <LogsModal changeVisible={ this.changeVisible } visible={ this.state.visible } data={ this.props.guidResult } />
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
    guidResult: state.getIn(['base', 'guidResult']),
    logsList: state.getIn(['operation', 'logsList']),
    getParamsByServiceNameList: state.getIn(['base', 'getParamsByServiceNameList']),
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
    getQueryLogsAction:  (data) => {
      dispatch(getQueryLogsAction(data))
    },
    getGuidAction: (data) => dispatch(getGuidAction(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(queryLogs)