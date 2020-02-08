
import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { Button, Modal, List, Typography } from 'antd'
import ContnentUI from '@/components/Content'

import { getMenuItemAction } from '@/components/NavLeft/store/actionCreators'
import { getLightSignInAppInfoAction, getAppInfoDetailAction } from '@/pages/one_click_login/store/actionCreators'

class oneClickLoginDetail extends Component{

  state = {
    modalVisible: false,
    appNewsObj : {
      appId: '小视_appId',
      appKey: '小视_appKey',
      packageName: '包名',
      packageSign: '包签名',
      bundleId: 'bundleId'
    },
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
  delFun = () => {

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
        console.log(record)
        return <div className="operate-button">
          <Button size='small' onClick={() => this.lookFun(value.appId, record)} className="span-link">查看</Button>
          <Button size='small' onClick={() => this.editorFun(value)} className="span-link">编辑</Button>
          <Button size='small' onClick={() => this.delFun(value)} className="span-link">删除</Button>
        </div>
        }
      }]
    return <TableUI rowKey={'appName'} dataSource={ lightSignInAppInfoList } columns={ columns } />
  }
  
  renderAppNewFun = () => {
    const { appNewsObj, appDetailNews } = this.state
    return Object.keys(appNewsObj).forEach(v => {
      return <span>
       { `${appNewsObj[v]}:${appDetailNews[v]}` } 
      </span>
    })
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
          { this.renderAppNewFun() }
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
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(oneClickLoginDetail))