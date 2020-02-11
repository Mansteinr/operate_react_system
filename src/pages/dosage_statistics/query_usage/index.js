import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'
import InquiryUI from '@/components/Inquiry'
import {
  getBaseCustomersAction,
  getBaseBusinessTypesAction
} from '@/common/js/store/actionCreators'

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
    type: 'Select',
    label: '行业类型',
    showSearch: false,
    field: 'businessType',
    selectDefault: 'typeId',
    selectText: 'typeName',
    placeholder: '请选择行业类型'
  }, {
    type: 'Select',
    label: '客户名称',
    field: 'loginName',
    selectLable: 'loginName',
    selectDefault: 'customerId',
    selectText: 'customerName',
    placeholder: '请选择客户名称'
  }]
  
     // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    console.log(params)
  }
  
  render () {
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI testData = { this.props.baseBusinessTypesList } formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
      </Fragment>
    )
  }
  componentDidMount () {
    let { getBaseCustomersAction, getBaseBusinessTypesAction } = this.props
    getBaseBusinessTypesAction()
    getBaseCustomersAction()
  }
}

function mapStateToProps (state) {
  return {
    baseCustomersList: state.getIn(['base', 'baseCustomersList']),
    baseBusinessTypesList: state.getIn(['base', 'baseBusinessTypesList']),
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
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(queryUsage)