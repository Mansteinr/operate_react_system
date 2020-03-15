
import { connect } from 'react-redux'
import React, { Component } from 'react'
import TableUI from '@/components/Table'
import ContnentUI from '@/components/Content'
import { Button, Modal,Row, Col, Checkbox } from 'antd'
import { 
  getAllServiceNameParamsAction,
  deleteServiceNameAndParamAjaxAction } from '../store/actionCreators'
import './index.less'

class configureinterfaceParameter extends Component {
  state = {
    visible: false,
    checkedOption: [],
    serviceName: '',
    paramNameBeans: []
  }

  handleOk = value=> {
    let option = {
      serviceName: this.state.serviceName
    },paramNameBeans = []

    this.state.paramNameBeans.map
    
    this.setState({
      visible: false
    })
  }

  handleCancel = value => {
    this.setState({
      visible: false
    })
  }

  showModal = (value) => {
    this.setState({
      visible: true,
      serviceName: value.serviceName,
      paramNameBeans: value.paramNameBeans
    })
  }

  handleDelete = value => {
    this.showModal(value)
  }

  // 渲染dom
  renderConfigureinterfaceParameterTable = () => {
    let data = this.props.allServiceNameParamsList,
      columns = [{
        title: '服务名',
        dataIndex: 'serviceName',
        render: (value, record, index) => {
          return record.paramNameBeans.length <= 4 ? `${value} (${record.serviceNameCh||'--'})` : <span key={Math.random()} className="span-link">{`${ value }: ${ record.serviceNameCh||'--' }`}</span>
        }
      },{
        title: '参数',
        dataIndex: 'paramNameBeans',
        render: (value, record, index) => {
          let spanList = []
          if (value && value.length) {
            value.forEach((v, k) => {
              spanList.push(<span key={Math.random()} className="param-item">{`${v.paramNameCh}: ${v.paramName}`}</span>)
            })
          }
          return <div className="param-item-wrapper">{spanList}</div>
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

  onChange = (value) => {
    this.setState({
      checkedOption: value
    })
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
           <Modal
            title="Basic Modal"
            className="config-modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Row>
              <Col span={6}>服务名称：</Col>
              <Col span={12}>{ this.state.serviceName }</Col>
            </Row>
            <Row>
              <Col span={6}>参数：</Col>
              <Col span={12}>
                <Checkbox.Group style={{ width: '100%' }} onChange={ this.onChange} >
                  { 
                    this.state.paramNameBeans.map(v => {
                      return  <Checkbox checked value={`${ v.paramName }_${ v.paramNameCh || '-' }`}>{v.paramNameCh}</Checkbox>
                    })
                  }
                </Checkbox.Group>
              </Col>
            </Row>
          </Modal>
      </div>
    )
  }

  shouldComponentUpdate(nextProps,nextState) {
    if(nextProps.deleteServiceNameParamFlag) {
      this.props.getAllServiceNameParamsAction()
      this.props.deleteServiceNameAndParamAjaxAction()
    }
    return true
  }

    // // 确认提交表单数据 子组件传递上来的
  componentDidMount () {
    this.props.getAllServiceNameParamsAction()
  }

}

function mapStateToProps (state) {
  return {
    allServiceNameParamsList: state.getIn(['configuration', 'allServiceNameParamsList']),
    deleteServiceNameParamFlag: state.getIn(['configuration', 'deleteServiceNameParamFlag']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllServiceNameParamsAction: () => dispatch(getAllServiceNameParamsAction()),
    deleteServiceNameAndParamAjaxAction: (data) => dispatch(deleteServiceNameAndParamAjaxAction(data)),
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(configureinterfaceParameter)