
import { Button } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import TableUI from '@/components/Table'
import ContnentUI from '@/components/Content'
import { getAllServiceNameParamsAction } from '../store/actionCreators'

class configureinterfaceParameter extends Component {

  handleDelete = value => {
    
  }

  // 渲染dom
  renderConfigureinterfaceParameterTable = () => {
    let data = this.props.allServiceNameParamsList,
      columns = [{
        title: '服务名',
        dataIndex: 'serviceName',
        render: (value, record, index) => `${value}(${record.serviceNameCh})`
      },{
        title: '参数',
        dataIndex: 'paramNameBeans',
        render: (value, record, index) => {
          let spanList = []
          if (value && value.length) {
            value.forEach(v => {
              spanList.push(<span key={Math.random()} className="param-item">{`${v.paramNameCh}: ${v.paramName}`}</span>)
            })
          }
          return spanList
        }
      }, {
        title: '操作',
        render: (value, record, index) => <span onClick={() => this.handleDelete(value)} className="span-link">删除</span>
      }]

    return <TableUI rowKey={'serviceNameCh'} dataSource={ data } columns={ columns } />
  }

  // 新增
  addFun = () => {
    
  }

  render() {
    const { allServiceNameParamsList } = this.props
    return (
      <div className="card-space">
        <div className="button-group">
          <Button onClick={ () => this.addFun() } type="primary">新增</Button>
        </div>
        <ContnentUI
          title = '一键登录管理 '
          data={ allServiceNameParamsList }
          renderTableFun={ this.renderConfigureinterfaceParameterTable } />
      </div>
    )
  }

    // // 确认提交表单数据 子组件传递上来的
  componentDidMount () {
    this.props.getAllServiceNameParamsAction()
  }

}

function mapStateToProps (state) {
  return {
    allServiceNameParamsList: state.getIn(['configuration', 'allServiceNameParamsList'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllServiceNameParamsAction: () => dispatch(getAllServiceNameParamsAction())
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(configureinterfaceParameter)