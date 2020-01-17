import API from '../../config'
import Axios from '../../axios'
import React, { Component, Fragment } from 'react'
import InquiryUI from '../../components/Inquiry'

export default class QueryIndex extends Component{

  formList = [{
    type: 'DateRange',
    label: '选择日期',
    field: 'DateRange',
    placeholder: '请选择日期',
    firstName: 'start',
    lastName: 'end',
    formatter: 'YYYY-MM-DD'
  }]
  // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    console.log(params)
  }

  render() {
    return(
      <Fragment>
        <div className="card-space">
          <InquiryUI formList ={this.formList} filterSubmit={this.handleFilter}/>
        </div>
        <div className="card-space">
          <div className="card-title"> 查询结果 </div>

        </div>
      </Fragment>
    )
  }
}