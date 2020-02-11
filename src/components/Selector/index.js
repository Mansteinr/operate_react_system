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
    let { selectLable, selectDefault, selectText } =  this.props
    if(!data.length) return 
    let optionList = []
    data.map(v => {
      optionList.push(<Option title={ `${v[selectText]}(${v[selectLable] ||  v[selectDefault] })` } key ={ v[selectDefault] } value={ v[selectLable] || v[selectDefault] }> { v[selectText] } </Option>)
    })
    return optionList
  }

  render () {
    let { data, showSearch, selectText } = this.props
    console.log(data[0] ? data[0][selectText] : '')
    return (
      <Select
        onChange = { this.handleChange }
        defaultValue= { data[0] ? data[0][selectText] : '' }
        showSearch = { showSearch || true }
        optionFilterProp="children"
        filterOption={ (input, option) => this.filterOption(input, option) }
      >
      { this.renderOption(data) }
      </Select>
    )
  }
}