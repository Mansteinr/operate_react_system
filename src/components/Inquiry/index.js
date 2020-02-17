// 查询组件
import moment from 'moment'
import Select from '../Selector'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, DatePicker } from 'antd'
import {
  changeDateRangeAction
} from '@/common/js/store/actionCreators'

let FormItem = Form.Item, { RangePicker } = DatePicker
class Inquiry extends Component {

  // 禁选日期
  disabledDate(current) {
    return current > moment() || current < moment('2017-03-15')
  }

  // 提交form表单参数
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue()

    this.props.formList.forEach(v => {
      if(v.type === 'DateRange') {
        fieldsValue[v.firstName] = fieldsValue[v.type][0].format(v.formatter)
        fieldsValue[v.lastName] = fieldsValue[v.type][1].format(v.formatter)
        delete fieldsValue[v.type]
      }
    })
    this.props.filterSubmit(fieldsValue)
  }

  // 重置form表单
  reset = () => {
    this.props.form.resetFields()
  }

  selctorChange = (key, data) => {
    this.props.form.setFieldsValue({
      [key]: data
    })
  }

  // 日期变化

  changeDateRange = (date,dateString) => {
    this.props.changeDateRangeAction(dateString)
  }

  // 渲染查询条件
  initFormList = () => {
    const { getFieldDecorator } = this.props.form, // 解构
          formList = this.props.formList,
          formItemList = [] //定义参数
    
    if (formList && formList.length > 0) {
      formList.forEach(v => {
        if (v.type === 'DateRange') {
          formItemList.push(<FormItem label={v.label} key={v.field}>
            {
              getFieldDecorator('DateRange', {
                initialValue: v.initialValue || [moment(+new Date() - 7 * 1000 * 24 * 3600), moment()]
              })(
                <RangePicker
                  disabledDate={v.disabledDate || this.disabledDate} // 禁选日期
                  onChange = { this.changeDateRange }
                  ranges={{ // 快捷键设置
                    '最近一个星期': [moment(+new Date() - 7 * 1000 * 24 * 3600), moment()],
                    '最近一个月': [moment(+new Date() - 30 * 1000 * 24 * 3600), moment()],
                    '当前月': [moment().startOf('month'), moment().endOf('month')],
                    '最近三个月': [moment(+new Date() - 90 * 1000 * 24 * 3600), moment().endOf('month')],
                    '全部': [moment('2017-03-15'), moment()]
                  }}
                />
              )
            }
            </FormItem>)
          
        } else if (v.type === 'Select') {
          let data = this.props[`${v.field}List`] || []
          if (v.isAll) {
            data = [...[{
              [ v.selectText ]: '全部',
              [ v.selectLable ]: '',
              [ v.selectDefault ]: ''
            }], ...data]
          }

          formItemList.push(<FormItem label={v.label} key={v.field}>
            {
              getFieldDecorator( `${v.field}` , {
                initialValue:  data[0] ? data[0][v.selectLable] : ''
              })(
                <Select
                  data={ data }
                  mode = { v.mode }
                  showSearch={ v.showSearch }
                  isAll = { v.isAll || false }
                  selectText = { v.selectText }
                  selectLable = { v.selectLable }
                  selectDefault = { v.selectDefault }
                  formSelctorChange={this.selctorChange}
                  notRequestService = { v.notRequestService }
                  labelInValue = { v.labelInValue || false }/>
              )
            }
          </FormItem>)
        }
      })
    }
    return formItemList
  }

  render () {
    return (
      <Form layout="inline">
        <div className="card-title"> {this.props.cardTitle || '查询条件'} </div>
        <div className="inquiry-wrapper">
          { this.initFormList() }
        </div>
        <FormItem className="search-space">
          <Button type="primary" style={{ margin: '0 20px' }} onClick={ this.handleFilterSubmit }>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

const InquiryForm =  Form.create({})(Inquiry)

function mapStateToProps (state) {
  return {
    loginNameList: state.getIn(['base', 'baseCustomersList']),
    businessTypeList: state.getIn(['base', 'baseBusinessTypesList']),
    serviceNameList: state.getIn(['base', 'baseServiceList']),
    companyNameList: state.getIn(['base', 'supplierList']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeDateRangeAction: (data) => dispatch(changeDateRangeAction(data))
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(InquiryForm)