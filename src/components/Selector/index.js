
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

  handleChange = (value) => {
    let { id, formSelctorChange,
      changeBaseCustomersListAction,
      getBaseServicesAction
    } = this.props
    formSelctorChange(id, value)
    if (id === 'businessType') {
      changeBaseCustomersListAction(value)
    } else if (id === 'loginName') {
      getBaseServicesAction({
        customerId: value
      })
    }
  }

  // 筛选
  filterOption = (input, option) => {
    if (!option) return
    let text = option.props.title.trim().toLowerCase(), searchValue = input.trim().toLowerCase()
    console.log(text)
    return text.indexOf(searchValue) >= 0 || pinyin.getFullChars(text).toLowerCase().indexOf(searchValue) >= 0 || pinyin.getCamelChars(text).toLowerCase().indexOf(searchValue) >= 0
    // return  text.indexOf(input) >= 0 || text.indexOf(input) >= 0 
    // return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  renderOption = (data) => {
    if(!data.length) return 
    let { selectLable, selectDefault, selectText } =  this.props,
      optionList = []
    
    data.map(v => {
      optionList.push(<Option data-key={`${v[selectLable] ||  v[selectDefault] }`} title={ `${v[selectText]}(${v[selectLable] ||  v[selectDefault] })` } key ={ v[selectDefault] } value={v[selectDefault]||v[selectLable]}>{v[selectText]}</Option>)
    })
    return optionList
  }

  render () {
    let { data, showSearch, selectDefault } = this.props
    
    return (
      <Select
        onChange={this.handleChange}
        key = { data[0] ? data[0][selectDefault] : '' }
        defaultValue= { data[0] ? data[0][selectDefault] : '' }
        showSearch = { showSearch || true }
        optionFilterProp="children"
        filterOption={ (input, option) => this.filterOption(input, option) }
      >
      { this.renderOption(data) }
      </Select>
    )
  }
}

function mapStateToProps (state) {
  return {
    loginNameList: state.getIn(['base', 'baseCustomersList']),
    businessTypeList: state.getIn(['base', 'baseBusinessTypesList']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeBaseCustomersListAction: data => dispatch(changeBaseCustomersListAction(data)),
    getBaseServicesAction: data => dispatch(getBaseServicesAction(data)),
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector)