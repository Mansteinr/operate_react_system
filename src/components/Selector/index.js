
import { Select } from 'antd'
import pinyin from 'js-pinyin'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  changeBaseCustomersListAction,
  getBaseServicesAction
} from '@/common/js/store/actionCreators'

const { Option } = Select

class Selector extends Component{

  handleChange = (value, option) => {
    let {
      id,
      mode,
      notRequestService,
      formSelctorChange,
      getBaseServicesAction,
      changeBaseCustomersListAction,
    } = this.props
    console.log(value)
    if (id === 'businessType') {
      changeBaseCustomersListAction(value)
    } else if (id === 'loginName') {
      if (!notRequestService) {
        getBaseServicesAction({
          customerId : option['data-key']
        })
      }
    }
    formSelctorChange(id, value)
  }

  // 筛选
  filterOption = (input, option) => {
    if (!option) return
    let text = option.props.title.trim().toLowerCase(), searchValue = input.trim().toLowerCase()
    return text.indexOf(searchValue) >= 0 || pinyin.getFullChars(text).toLowerCase().indexOf(searchValue) >= 0 || pinyin.getCamelChars(text).toLowerCase().indexOf(searchValue) >= 0
  }

  renderOption = (data) => {
    if(!data.length) return 
    let { selectLable, selectDefault, selectText } =  this.props,
      optionList = []
    
    data.map(v => {
      optionList.push(<Option data-key={`${v[selectDefault] ||  v[selectLable] || v }`}  title={ `${v[selectText]}(${v[selectLable] || v })` } key ={ v[selectLable] || v } value={ v[selectLable] || v}>{ v[selectText] || v }</Option>)
    })
    return optionList
  }

  render () {
    let { data, showSearch, selectLable, mode } = this.props
    return (
      <Select
        mode={mode}
        maxTagCount = { 1 }
        onChange={this.handleChange}
        key = { data[0] ? ( data[0][selectLable] ? data[0][selectLable] : data[0]) : '' }
        defaultValue= { data[0] ? ( data[0][selectLable] ? data[0][selectLable] : data[0]) : '' }
        showSearch = { showSearch || true }
        optionFilterProp="children"
        filterOption={ (input, option) => this.filterOption(input, option) }
      >
      { this.renderOption(data) }
      </Select>
    )
  }
}

// function mapStateToProps (state) {
//   return {}
// }

function mapDispatchToProps(dispatch) {
  return {
    changeBaseCustomersListAction: data => dispatch(changeBaseCustomersListAction(data)),
    getBaseServicesAction: data => dispatch(getBaseServicesAction(data)),
  }
}

export default connect(null, mapDispatchToProps)(Selector)