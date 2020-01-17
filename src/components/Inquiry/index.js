// 查询组件
import React, { Component } from 'react'
import { Form, Button, DatePicker } from 'antd'
import moment from 'moment'

let FormItem = Form.Item, { RangePicker } = DatePicker
class Inquiry extends Component {

  // 禁选日期
  disabledDate(current) {
    return current > moment() || current < moment('2017-03-15')
  }

  // 提交form表单参数
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue(), values = {}

    this.props.formList.forEach(v => {
      if(v.type === 'DateRange') {
        let params = fieldsValue[v.type]
        values[v.firstName] = params[0].format(v.formatter)
        values[v.lastName] = params[1].format(v.formatter)
      }
    })
    this.props.filterSubmit(values)
  }

  // 重置form表单
  reset = () => {
    this.props.form.resetFields()
  }

  onChange = (date, dateString) => {
    console.log(dateString, date)
  }

  // 渲染查询条件
  initFormList = () => {
    const { getFieldDecorator } = this.props.form, // 解构
          formList = this.props.formList,
          formItemList = [] //定义参数

    if (formList && formList.length > 0) {
      formList.forEach(v => {
        if (v.type === 'DateRange') {
          const DateRange = <FormItem label={ v.label } key={ v.field }>
            {
              getFieldDecorator('DateRange', {
                initialValue: v.initialValue || [moment(+new Date() - 7 * 1000 * 24 * 3600), moment()]
              })(
                <RangePicker
                  disabledDate={v.disabledDate || this.disabledDate} // 禁选日期
                  ranges={{ // 快捷键设置
                    '最近一个星期': [moment(+new Date() - 7 * 1000 * 24 * 3600), moment()],
                    '最近一个月': [moment(+new Date() - 30 * 1000 * 24 * 3600), moment()],
                    '当前月': [moment().startOf('month'), moment().endOf('month')],
                    '最近三个月': [moment(+new Date() - 90 * 1000 * 24 * 3600), moment().endOf('month')],
                    '全部': [moment('2017-03-15'), moment()]
                  }}
                  onChange={this.onChange}
                />
              )
            }
          </FormItem>;
          formItemList.push(DateRange)
        }
      })
    }
    return formItemList
  }

  render() {
    return (
      <Form layout="inline">
        <div className="card-title"> { this.props.cardTitle || '查询条件' } </div>
        {this.initFormList()}
        <FormItem className="search-space">
          <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(Inquiry)