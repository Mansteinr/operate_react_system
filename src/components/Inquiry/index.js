// 查询组件
import moment from 'moment'
import Select from '../Selector'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, DatePicker, TimePicker, Input } from 'antd'
import {
  changeDateRangeAction
} from '@/common/js/store/actionCreators'
import {
  getIsCollapseAction
} from '@/pages/operation-tools/store/actionCreators'

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
      } else {
        if (fieldsValue.end) {
          fieldsValue.end = moment(fieldsValue.end).format('HH:mm:ss')
        }
        if (fieldsValue.start) {
          fieldsValue.start = moment(fieldsValue.start).format('HH:mm:ss')
        }
        if (fieldsValue.day) {
          fieldsValue.day = moment(fieldsValue.day).format('YYYY-MM-DD')
        }
      }
    })
    this.props.filterSubmit(fieldsValue)
  }

  // 重置form表单
  reset = () => {
    this.props.form.resetFields()
  }

  handleCollapse = () => {
    let { isCollapse, getIsCollapseAction } = this.props
    getIsCollapseAction(!isCollapse)
  }

  selctorChange = (key, data) => {
    this.props.form.setFieldsValue({
      [key]: data
    })
  }

  // 日期变化
  changeDateRange = (date, dateString) => {
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
                  formSelctorChange={ this.selctorChange }
                  notRequestService = { v.notRequestService }
                  isQueryParams = { v.isQueryParams }
                  labelInValue = { v.labelInValue || false }/>
              )
            }
          </FormItem>)
        } else if (v.type === 'DatePicker') {
          formItemList.push(<FormItem label={v.label} key={v.field}>
            {
              getFieldDecorator(`${v.field}`, {
                initialValue: v.initialValue ? moment(v.initialValue, 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD')
              })(
                <DatePicker
                  onChange={this.changeDateRange}
                  disabledDate={v.disabledDate || this.disabledDate} // 禁选日期
                 />
              )
            }
            </FormItem>)
          
        } else if (v.type === 'TimePicker') {
          formItemList.push(<FormItem label={v.label} key={v.field}>
            {
              getFieldDecorator(`${v.field}`, {
                initialValue: v.initialValue ? moment(v.initialValue, 'HH:mm:ss') : moment(new Date(), 'HH:mm:ss')
              })(
                <TimePicker
                onChange={this.changeDateRange}
                />
              )
            }
            </FormItem>)
        }
      })
    }
    return formItemList
  }

  renderParams = () => {
    let { getFieldDecorator } = this.props.form, renderParamsList = this.props.renderParamsList, formItemList = []
   
    if (renderParamsList.length) {
      renderParamsList.map(v => {
        formItemList.push(<FormItem label={v.paramNameCh} key={Math.random()}>
          {
            getFieldDecorator(`${v.paramName}`, {
              initialValue: v.initialValue || ''
            })(
              <Input
                placeholder = { `请输入${v.paramNameCh}` }
              />
            )
          }
          </FormItem>)
      })
      return formItemList
    }
  }

  render () {
    return (
      <Form layout="inline">
        <div className="card-title"> {this.props.cardTitle || '查询条件'} </div>
        <div className="inquiry-wrapper">
          { this.initFormList() }
          
          {this.props.renderParamsList ? <div className="param-wrapper">
            <div className="param-button"><Button type="primary"  onClick={ this.handleCollapse } >{ this.props.isCollapse ? '隐藏' : '显示'}</Button></div>
            <div className={this.props.isCollapse ? 'param-item active' : 'param-item'}>{this.renderParams()}</div>
          </div> : ''}
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
    isCollapse: state.getIn(['operation', 'isCollapse']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeDateRangeAction: (data) => dispatch(changeDateRangeAction(data)),
    getIsCollapseAction: (data) => dispatch(getIsCollapseAction(data)),
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(InquiryForm)