
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
    if(!option) return
    return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  renderOption = (data) => {
    if(!data.length) return 
    let { selectLable, selectDefault, selectText, isAll } =  this.props,
      optionList = []
    if (isAll) {
      data = [...[{
            [selectText]: '全部',
            [selectLable]: '',
            [selectDefault]: '',
          }], ...data]
    }
    data.map(v => {
      optionList.push(<Option title={ `${v[selectText]}(${v[selectLable] ||  v[selectDefault] })` } key ={ v[selectDefault] } value={ v[selectDefault] || v[selectLable] }> { v[selectText] } </Option>)
    })
    return optionList
  }

  render () {
    let { data, showSearch, selectText } = this.props
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