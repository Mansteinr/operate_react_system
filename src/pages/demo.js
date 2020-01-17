import React, { Component } from 'react'
import { Form, DatePicker, TimePicker, Button } from 'antd';
import moment from 'moment'
const { MonthPicker, RangePicker } = DatePicker;

export default class Demo extends Component {
  onChange = (dates, dateStrings) => {
    console.log(dates, dateStrings)
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  disabledDate (current) {
    return  current > moment() || current < moment('2017-03-15')
  }
  render() {
    return (
      <div>
        <RangePicker
          disabledDate={this.disabledDate}
          defaultValue={[moment(+new Date() - 30 * 1000 * 24 * 3600), moment()]}
          ranges={{
            '最近一个星期': [moment(+new Date() - 7 * 1000 * 24 * 3600), moment()],
            '最近一个月': [moment(+new Date() - 30 * 1000 * 24 * 3600), moment()],
            '当前月': [moment().startOf('month'), moment().endOf('month')],
            '最近三个月': [moment(+new Date() - 90 * 1000 * 24 * 3600), moment().endOf('month')],
            '全部': [moment('2017-03-15'), moment()]
          }}
          onChange={this.onChange}
        />
      </div>
    )
  }
}