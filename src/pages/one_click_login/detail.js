/* eslint-disable react/jsx-no-comment-textnodes */

import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Modal, Popconfirm } from 'antd'
import ContnentUI from '@/components/Content'

import { getMenuItemAction } from '@/components/NavLeft/store/actionCreators'
import {
  getLightSignInAppInfoAction,
  getAppInfoDetailAction,
  delAppNewsAction
} from '@/pages/one_click_login/store/actionCreators'
import './index.less'

class oneClickLoginDetail extends Component{

  state = {
    modalVisible: false,
    appDetailNews: {}
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }


  // 查看
  lookFun = (param, record) => {
    this.setState({
      modalVisible: true,
      appDetailNews: record
    })
    this.props.getAppInfoDetailAction(param)
  }
  // 编辑
  editorFun = () => {

  }
  // 删除
  delFun = (param) => {
    this.props.delAppNewsAction(param)
  }

    // 渲染dom
  renderOneCLickLoginDetailTable = () => {
    const { lightSignInAppInfoList } = this.props,
      columns = [{
        title: '应用名称',
        dataIndex: 'appName'
      },{
        title: '所属行业',
        dataIndex: 'appBusiness'
      },{
        title: '应用类型',
        dataIndex: 'appType'
      },{
        title: '图标',
        dataIndex: 'icon',
          // eslint-disable-next-line jsx-a11y/alt-text
        render: (value, record, index) => <img src={ `data:image/jpeg;base64,${value}` }/>
      },{
        title: '平台详情',
        dataIndex: 'platform'
      },{
        title: '链接',
        dataIndex: 'iosLink'
      },{
        title: 'APP状态',
        dataIndex: 'appState',
        render: (value, record, index) => value === '0' ? '启用' : '未启用'
      },{
        title: '创建时间',
        dataIndex: 'createTime'
      },{
        title: '操作',
        render: (value, record, index) => {
        return <div className="operate-button">
          <Button size='small' onClick={() => this.lookFun(value.appId, record)} className="span-link">查看</Button>
          <Button size='small' onClick={() => this.editorFun(value)} className="span-link">编辑</Button>
          <Button size='small'  className="span-link">
            <Popconfirm title="确定删除?" onConfirm={() => this.delFun(value.appId)}>
              <a>删除</a>
            </Popconfirm>
          </Button>
        </div>
        }
      }]
    return <TableUI rowKey={'appName'} dataSource={ lightSignInAppInfoList } columns={ columns } />
  }

  renderAppInfoDetailTable = () => {
    const { appInfoNews } = this.props,
    columns = [{
        title: '应用ID',
        dataIndex: 'appId'
      }, {
        title: 'appId',
        dataIndex: 'id'
      }, {
        title: 'appKey',
        dataIndex: 'appKey'
      }, {
        title: '供应商',
        dataIndex: 'provider',
        render: (value, record, index) => value === '0' ? '创蓝' : '电信'
        }]
    return <TableUI rowKey={'appId'} dataSource={ appInfoNews } columns={columns} />
  }

  render () {

    const { lightSignInAppInfoList } = this.props

    return (
      <div className="card-space">
        <ContnentUI
          data={ lightSignInAppInfoList }
          renderTableFun={this.renderOneCLickLoginDetailTable} />
        <Modal
          title="app详情"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <div className="appNew-wrapper">
            <div className="appNew-item">
              <span>小视_appId:</span> {this.state.appDetailNews.appId}
            </div>
            <div className="appNew-item">
              <span>小视_appKey:</span> {this.state.appDetailNews.appKey}
            </div>
            <div className="appNew-item">
              <span>包名:</span> {this.state.appDetailNews.packageName}
            </div>
            <div className="appNew-item">
              <span>包签名:</span> {this.state.appDetailNews.packageSign}
            </div>
            <div className="appNew-item">
              <span>bundleId:</span> {this.state.appDetailNews.bundleId}
            </div>
          </div>
          { this.renderAppInfoDetailTable() }
        </Modal>
      </div>
    )
  }

  componentDidMount () {
    this.props.getLightSignInAppInfoAction(this.props.match.params.id)
  }
}



function mapStateToProps (state) {
  return {
    menuActive: state.getIn(['navLeft', 'menuActive']),
    lightSignInAppInfoList: state.getIn(['oneClickLogin', 'lightSignInAppInfoList']),
    appInfoNews: state.getIn(['oneClickLogin', 'appInfoNews']),
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    getMenuItemAction: (data) => {
      dispatch(getMenuItemAction(data))
    },
    getLightSignInAppInfoAction: (data) => {
      dispatch(getLightSignInAppInfoAction(data))
    },
    getAppInfoDetailAction: (data) => {
      dispatch(getAppInfoDetailAction(data))
    },
    delAppNewsAction: (data) => {
      dispatch(delAppNewsAction(data))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(oneClickLoginDetail))