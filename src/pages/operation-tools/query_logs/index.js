import { connect } from 'react-redux'
import Charts from '@/components/Charts'
import TableUI from '@/components/Table'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import { Input } from 'antd'
import { renderTableFooter, sortOrderTable } from '@/utils'
import {
  getBaseCustomersAction,
  getBaseBusinessTypesAction,
  getBaseServicesAction
} from '@/common/js/store/actionCreators'

import {
  getUsageByDateAction
} from '@/pages/query_index/store/actionCreators'

class queryLogs extends Component{
  state = {
    renderParamList: []
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
    console.log(params)
  }
  
  render () {
    let getParamsByServiceNameList = this.props.getParamsByServiceNameList || [], arrList = [{paramName:'lowerCostTime',paramNameCh: '耗时大于'},{paramName:'upperCostTime',paramNameCh: '耗时小于'}],paramsList = [...getParamsByServiceNameList, ...arrList]
    console.log(this.props.getParamsByServiceNameList || [])
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={this.formList} filterSubmit={this.handleFilter} renderParamsList={ paramsList }/>
        </div>
        <div className="card-space">
          <ContnentUI />
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
    getParamsByServiceNameList: state.getIn(['base', 'getParamsByServiceNameList'])
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(queryLogs)