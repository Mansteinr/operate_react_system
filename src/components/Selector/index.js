import React, { Component } from 'react'
import { Select } from 'antd'
import pinyin from 'js-pinyin'

const { Option } = Select

export default class Selector extends Component{

 

  handleChange = (value) => {
    let { id, formSelctorChange } = this.props
    formSelctorChange(id, value)
  }

  // 筛选
  filterOption = (input, option) => {
    if(!option) return
    return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  renderOption = (data) => {
    let optionList = []
    data.map(v => {
      optionList.push(<Option key ={ v.value || v.lable } value={ v.value }> { v.lable } </Option>)
    })
    return optionList
  }

  render () {
    let { data, showSearch } =  this.props
    return (
      <Select
        onChange = { this.handleChange }
        defaultValue= { data[2].value }
        showSearch = { showSearch || true }
        optionFilterProp="children"
        filterOption={ (input, option) => this.filterOption(input, option) }
      >
      { this.renderOption(data) }
      </Select>
    )
  }
}