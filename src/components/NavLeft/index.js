
/**
 * 左侧组件
 */
import { Menu } from 'antd'
import API from '../../config'
import Axios from '../../axios'
import store from '../../store'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getMenuItemAction } from '../../store/actionCreators'
import './index.less'

const { SubMenu } = Menu

export default class NavLeft extends Component {

  rootSubmenuKeys = []
  state = {
    openKeys: []
  }
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  handleClick = item => {
    const action = getMenuItemAction({
      url: item.resourceUrl,
      key: item.id + '', // 转为string类型 antd框架要求的
      title: item.name
    })
    store.dispatch(action)
  }

  // 渲染菜单
  renderMenu = (data) => {
    return data.map(v => {
      if (v.childResource.length) {
        if(v.id !== 331 && v.id !== 339) {
          this.rootSubmenuKeys.push(v.id+'')
        }
        return (
          <SubMenu key={v.id}
            title={
              <span>
                <i className={`iconfont ` + v.icon}></i>
                <span className="menu-itme-text">{ v.name }</span>
              </span>
            } >
            {this.renderMenu(v.childResource)}
          </SubMenu>
        )
      }
      if(!store.getState().title) {
        store.dispatch(getMenuItemAction({
          url: v.resourceUrl,
          key: v.id + '',  //转为string类型 antd框架要求的
          title: v.name
        }))
      }
      // 拼接路由i地址
      let trueUrl = v.resourceUrl.split('/')[v.resourceUrl.split('/').length - 1].split('.html')[0]
      return <Menu.Item title={v.name} key={v.id} onClick={() => this.handleClick(v)}>
        <NavLink to={ trueUrl }><i className={`iconfont ` + v.icon}></i> { v.name}</NavLink>
      </Menu.Item>
    })
  }
  render() {
    return (
      <Menu
        openKeys={this.state.openKeys}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['325']}
        mode="inline"
        theme="dark"
        onOpenChange={this.onOpenChange}
      >
        {this.state.menuTreeNode}
      </Menu>
    )
  }

  // 请求数据
  componentDidMount() {
    Axios.ajax({
      url: API.base.querymenus,
      data: {
        systemName: '服务平台'
      }
    }).then(res => {
      const menuTreeNode = this.renderMenu(res.resData)
      this.setState({
        openKeys: [res.resData[0].id+'']
      })
      this.setState({
        menuTreeNode
      })
    })
  }
}