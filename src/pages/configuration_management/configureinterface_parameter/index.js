
/**
 * 接口参数维护页面
 */
import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import { Button, Modal,Row, Col, Checkbox, Popconfirm } from 'antd'
import { 
  getAllServiceNameParamsAction,
  deleteServiceNameAndParamAjaxAction } from '../store/actionCreators'
import './index.less'

class configureinterfaceParameter extends Component {
  state = {
    looKVisible: false,
    deleteVisible: false,
    checkedOption: [],
    LookObj: {},
    deleteObj: {},
    checkedList: []
  }
  /**
   * 预览
   */
  // 弹框 确定

  // 取消弹框
  handleLooKCancel = value => {
    this.setState({
      looKVisible: false
    })
  }

  handleLook(value) {
    if(value.paramNameBeans.length <= 4) return
    this.setState({
      looKVisible: true,
      LookObj: value
    })
  }

  /**
   * 删除
   */

  handleDelete(value) {
    let data = []
    if(value.paramNameBeans.length) {
      value.paramNameBeans.forEach(v => {
        data.push(v.paramName)
      })
    }
    console.log(data, 'data')
    this.setState({
      deleteVisible: true,
      deleteObj: value,
      checkedList: data
    }, () => {
      console.log(this.state.checkedList, data)
    })
    
    
    
  }
  handleDeleteOk = () =>{
    
  }
  handleDeleteCancel = () =>{
    this.setState({
      deleteVisible: false

    })
  }
  // 渲染dom
  renderConfigureinterfaceParameterTable = () => {
    let data = this.props.allServiceNameParamsList,
      columns = [{
        title: '服务名',
        dataIndex: 'serviceName',
        render: (value, record, index) => {
          return record.paramNameBeans.length <= 4 ? `${value} (${record.serviceNameCh||'--'})` : <span key={Math.random()} onClick={() => this.handleLook(record)} className="span-link">{`${ value }  (${ record.serviceNameCh||'--' })`}</span>
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
          <Button onClick={ this.addFun } type="primary">新增</Button>
        </div>
        <ContnentUI
          title = '接口参数维护 '
          data={ allServiceNameParamsList }
          renderTableFun={ this.renderConfigureinterfaceParameterTable } />
           <Modal
            title = '预览'
            className="config-modal"
            visible={ this.state.looKVisible }
            onCancel={ this.handleLooKCancel }
            onOk = { this.handleLooKCancel }
          >
             <Row> 
                <Col span={4}>服务名称：</Col>
                <Col span={16}>{ this.state.LookObj.serviceName }</Col>
              </Row>
              <Row>
                <Col span={4}>参数：</Col>
                <Col span={16}>
                  { 
                    this.state.LookObj.paramNameBeans && this.state.LookObj.paramNameBeans.map(v => {
                      return  <div className="param-wrapper" title={`${v.paramNameCh}:${v.paramName}`} key={v.paramName}>
                              <span className="param-item">{v.paramNameCh}</span> <span className="param-item"> {v.paramName}</span>
                          </div>
                    })
                  }
                </Col>
              </Row>
          </Modal>
          <Modal
            title = '删除'
            className="config-modal"
            visible={ this.state.deleteVisible }
            onOk={ this.handleDeleteOk }
            onCancel={ this.handleDeleteCancel }
          >
             <Row> 
                <Col span={6}>服务名称：</Col>
                <Col span={12}>{ this.state.deleteObj.serviceName }</Col>
              </Row>
              <Row>
                <Col span={6}>参数：</Col>
                <Col span={12}>
                  <Checkbox.Group  defaultValue={this.state.checkedList} className="params-config" style={{ width: '100%' }} onChange={ this.onChange} >
                    { 
                      this.state.deleteObj.paramNameBeans && this.state.deleteObj.paramNameBeans.map(v => {
                        return  <Checkbox key={`${ v.paramName }_${ v.paramNameCh || '-' }`} value={v.paramName}>{v.paramNameCh} : {v.paramName}</Checkbox>
                      })
                    }
                  </Checkbox.Group>
                </Col>
              </Row>
          </Modal>
          {/* <Modal
            title = '新增'
            className="config-modal"
            visible={ this.state.visible }
            onOk={ this.handleOk }
            onCancel={ this.handleCancel }
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
              </Row> */}
          {/* </Modal> */}
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