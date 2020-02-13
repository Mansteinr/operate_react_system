
import { Button } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import TableUI from '@/components/Table'
import ContnentUI from '@/components/Content'
import { getLightSignInCustomersAction } from './store/actionCreators'
import { getMenuItemAction } from '@/components/NavLeft/store/actionCreators'

class oneClickLogin extends Component {

  handleClick = value => {
    let { getMenuItemAction, history } = this.props
    history.push({ pathname: `/oneClickLoginDetail/${value.loginName}`})
    getMenuItemAction({
      resourceUrl: `/oneClickLoginDetail/${value.loginName}.html`,
      name: `${value.loginName}详情`,
      key: +new Date()
    })
  }

  // 渲染dom
  renderOneCLickLoginTable = () => {
    const { lightSignInCustomersList } = this.props, data = [],
      columns = [{
        title: '客户名称',
        dataIndex: 'loginName'
      }, {
        title: '操作',
        render: (value, record, index) => <span onClick={() => this.handleClick(value)} className="span-link">详情</span>
      }]
    // eslint-disable-next-line array-callback-return
    lightSignInCustomersList.map(v => {
      data.push({
        loginName: v
      })
    })
    return <TableUI rowKey={'loginName'} dataSource={ data } columns={ columns } />
  }

  // 新增
  addFun = () => {
    let { getMenuItemAction, history } = this.props
    history.push({ pathname: `/oneClickLoginAdd/add`})
    getMenuItemAction({
      resourceUrl: `/oneClickLoginAdd/add.html`,
      name: `新增`,
      key: +new Date()
    })
  }

  render() {
    const { lightSignInCustomersList } = this.props
    return (
      <div className="card-space">
        <div className="button-group">
          <Button onClick={ () => this.addFun() } type="primary">新增</Button>
        </div>
        <ContnentUI
          title = '一键登录管理 '
          data={ lightSignInCustomersList }
          renderTableFun={ this.renderOneCLickLoginTable } />
      </div>
    )
  }

    // // 确认提交表单数据 子组件传递上来的
  componentDidMount () {
    this.props.getLightSignInCustomersAction()
  }

}

function mapStateToProps (state) {
  return {
    lightSignInCustomersList: state.getIn(['oneClickLogin', 'lightSignInCustomersList'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLightSignInCustomersAction: () => {
      dispatch(getLightSignInCustomersAction())
    },
    getMenuItemAction: (data) => {
      dispatch(getMenuItemAction(data))
    }
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(oneClickLogin)