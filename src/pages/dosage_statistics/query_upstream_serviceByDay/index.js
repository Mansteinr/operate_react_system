import { connect } from 'react-redux'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import API from '@/config'

import {
  downFileAction,
  getBaseServicesAction,
  getBaseCustomersAction
} from '@/common/js/store/actionCreators'

class queryUpstreamServiceByDay extends Component {

  formList = [{
    type: 'DateRange',
    label: '选择日期',
    field: 'DateRange',
    placeholder: '请选择日期',
    firstName: 'start',
    lastName: 'end',
    formatter: 'YYYY-MM-DD'
  }, {
    type: 'Select',
    label: '客户名称',
    field: 'loginName',
    notRequestService: false,
    selectLable: 'loginName',
    selectDefault: 'customerId',
    selectText: 'customerName',
    placeholder: '请选择客户名称'
  }, {
    isAll: true,
    type: 'Select',
    mode: 'multiple',
    label: '接口类型',
    field: 'serviceName',
    selectLable: 'serviceName',
    selectText: 'serviceNameZh',
    placeholder: '请选择接口类型'
  }]

  handleFilter = (param) => {
    let opt = {}
    if (param.serviceName === '') {
      opt = {
        method: 'get',
        url: `${API.upApi.getAllOutServiceChargeInfo}?start=${param.start}&end=${param.end}&serviceNames=''&loginName=${param.loginName}`
      }
    } else {
      param.serviceNames = param.serviceName 
      opt = {
        method: 'post',
        url: API.upApi.getOutServiceChargeInfoByDay,
        data: param
      } 
       param.serviceNames.splice(0, 1)
      delete param.serviceName
    }
    this.props.downFileAction(opt)
  }

  render () {
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
        <div className="card-space">
          <ContnentUI/>
        </div>
      </Fragment>
    )
  }

  componentDidMount () {
    let { getBaseCustomersAction, getBaseServicesAction } = this.props
    getBaseCustomersAction()
    getBaseServicesAction()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBaseServicesAction: () => dispatch(getBaseServicesAction()),
    getBaseCustomersAction: (data) => dispatch(getBaseCustomersAction(data)),
    downFileAction: (data) => dispatch(downFileAction(data))
  }
}

export default connect(null, mapDispatchToProps)(queryUpstreamServiceByDay)