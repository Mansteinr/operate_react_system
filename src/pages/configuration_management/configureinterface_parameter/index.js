
/**
 * 接口参数维护页面
 */

import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import ContnentUI from '@/components/Content'
import React, { Component } from 'react'
import { Button, Modal,Row, Col, Checkbox } from 'antd'
import { addParamAction } from '../store/actionCreators'
import { 
  getAllServiceNameParamsAction,
  deleteServiceNameAndParamAction } from '../store/actionCreators'
import './index.less'
import {
  getBaseServicesAction,
  getAllParamAction
} from '@/common/js/store/actionCreators'

import Select from '@/components/Selector'

class configureinterfaceParameter extends Component {
  state = {
    LookObj: {},
    deleteObj: {},
    checkedList: [],
    addVisible: false,
    looKVisible: false,
    deleteVisible: false,
    addParamObj: {}
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
        data.push(`${ v.paramName }_${ v.paramNameCh || '-' }`)
      })
    }
    this.setState({
      deleteObj: value,
      checkedList: data,
      deleteVisible: true
    })
  }
  handleDeleteOk = () =>{
    let paramNameBeans = [], { checkedList, deleteObj } = this.state

    if(checkedList.length) {
      checkedList.forEach(v => {
        paramNameBeans.push({
          paramName: v.split('_')[0],
          paramNameCh: v.split('_')[1]
        })
      })
    }
    deleteObj.paramNameBeans = paramNameBeans
    console.log(deleteObj)
    this.props.deleteServiceNameAndParamAction(deleteObj)
  }
  handleDeleteCancel = () =>{
    this.setState({
      deleteVisible: false
    })
  }

  /***
   * 新增
   */

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
    this.setState({
      addVisible: true
    })
  }
  handleAddOk = () => {
    let { addParamObj } = this.state, { allParamList, serviceNameList } = this.props

    if(!addParamObj.serviceName  && addParamObj.paramNameBeans) {
      this.setState({ addParamObj :{...this.state.addParamObj, ...{
        serviceName: serviceNameList[0].serviceName,
        serviceNameZh: serviceNameList[0].serviceNameZh
      }}}, () => {
        this.props.addParamAction(addParamObj)
      })
    }
    if(!addParamObj.paramNameBeans && addParamObj.serviceName) {
      let paramNameBeans = []
      paramNameBeans.push({
        paramNameCh: allParamList[0].paramNameCn,
        paramName: allParamList[0].paramNameEn
      })
      this.setState({addParamObj: {...this.state.addParamObj, ...{
        paramNameBeans
      }}}, () => {
        this.props.addParamAction(addParamObj)
      })
    }
    
  }
  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
  }
  onChange = (value) => {
    this.setState({
      checkedList: value
    })
  }
  selctorServiceChange = (key, data, option) => {
    this.setState({
      addParamObj: {...this.state.addParamObj, ...{
        serviceName: data,
        serviceNameCh: option.props.children
      }}
    }, () => {
      console.log(this.state.addParamObj)
    })
    
  }
  selctorParmChange = (key, data, option) => {
    let paramNameBeans = []
    if(data.length) {
      data.forEach(v => {
        paramNameBeans.push({
          paramName: v.split('_')[0],
          paramNameCh: v.split('_')[1],
        })
      })
    }
    this.setState({
      addParamObj: {...this.state.addParamObj, ...{
        paramNameBeans: paramNameBeans
      }}
    }, () => {
      console.log(this.state.addParamObj)
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
                <Col span={12}>{ this.state.deleteObj.serviceName } - { this.state.deleteObj.serviceNameCh }</Col>
              </Row>
              <Row>
                <Col span={6}>参数：</Col>
                <Col span={12}>
                  <Checkbox.Group value={ this.state.checkedList } className="params-config" style={{ width: '100%' }} onChange={ this.onChange } >
                    { 
                      this.state.deleteObj.paramNameBeans && this.state.deleteObj.paramNameBeans.map(v => {
                        return  <Checkbox key={`${ v.paramName }_${ v.paramNameCh || '-' }`} value={`${ v.paramName }_${ v.paramNameCh || '-' }`}>{v.paramNameCh} : {v.paramName}</Checkbox>
                      })
                    }
                  </Checkbox.Group>
                </Col>
              </Row>
          </Modal>
          <Modal
            title = '新增'
            className="config-modal"
            visible={ this.state.addVisible }
            onOk={ this.handleAddOk }
            onCancel={ this.handleAddCancel }
          >
              <Row> 
                <Col span={4}>服务名称：</Col>
                
                <Col span={16}>
                  <Select
                    selectLable = 'serviceName'
                    selectText = 'serviceNameZh'
                    data = { this.props.serviceNameList }
                    formSelctorChange={ this.selctorServiceChange }
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}>参数：</Col>
                <Col span={16}>
                <Select
                    mode = 'multiple'
                    selectLable = 'paramNameEn'
                    selectText = 'paramNameCn'
                    data = { this.props.allParamList }
                    formSelctorChange={ this.selctorParmChange }
                  />
                </Col>
              </Row>
           </Modal>
      </div>
    )
  }

  shouldComponentUpdate(nextState, nextProsp) {
    if(this.state.deleteVisible && this.props.deleteServiceNameParamFlag) {
      this.setState({
        deleteVisible: false
      })
    }
    if(this.state.deleteVisible && this.props.addServiceNameParamFlag) {
      this.setState({
        addVisible: false
      })
    }
    return true
  }

    // // 确认提交表单数据 子组件传递上来的
  componentDidMount () {
    const { getAllServiceNameParamsAction, getBaseServicesAction, getAllParamAction } = this.props
    getAllServiceNameParamsAction()
    getBaseServicesAction()
    getAllParamAction()
  }

}

function mapStateToProps (state) {
  return {
    allParamList: state.getIn(['base', 'allParamList']),
    serviceNameList: state.getIn(['base', 'baseServiceList']),
    addServiceNameParamFlag: state.getIn(['configuration', 'addServiceNameParamFlag']),
    allServiceNameParamsList: state.getIn(['configuration', 'allServiceNameParamsList']),
    deleteServiceNameParamFlag: state.getIn(['configuration', 'deleteServiceNameParamFlag'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addParamAction: () => dispatch(addParamAction()),
    getAllParamAction: () => dispatch(getAllParamAction()),
    getBaseServicesAction: () => dispatch(getBaseServicesAction()),
    getAllServiceNameParamsAction: () => dispatch(getAllServiceNameParamsAction()),
    deleteServiceNameAndParamAction: (data) => dispatch(deleteServiceNameAndParamAction(data)),
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(configureinterfaceParameter)