import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'
import InquiryUI from '@/components/Inquiry'

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
    placeholder: '请选择行业类型',
    data:[{
      lable: '全部',
      value: ''
    }, {
      lable: '金融公司',
      value: '0'
    }, {
      lable: '数据公司',
      value: '1'
    }, {
      lable: '租车',
      value: '2'
    }, {
      lable: '婚恋',
      value: '3'
    }, {
      lable: '其他',
      value: '4'
    }]
    }]
  
     // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    console.log(params)
  }
  
  render () {
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
      </Fragment>
      
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(queryUsage)