import React, { Component } from 'react'
import { Select } from 'antd'
import pinyin from 'js-pinyin'

const { Option } = Select

export default class Selector extends Component{
   handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  // 筛选
  filterOption = (input, option) => {
    if(!option) return
    return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  render () {
    return (
      <Select
        defaultValue="lucy"
        showSearch
        optionFilterProp="children"
        filterOption={ (input, option) => this.filterOption(input, option) }
      >
        { this.props.data.map(v => {
         return <Option value={ v.value }> { v.label } </Option>
        }) }
      </Select>
    )
  }
}