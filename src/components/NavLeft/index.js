
import { Menu } from 'antd'
import API from '../../config'
import Axios from '../../axios'
import React, { Component } from 'react'
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
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  handleClick = item => {
    console.log(item.resourceUrl)
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
      return <Menu.Item title={v.name} key={v.id} onClick={() => this.handleClick(v)}>
          <i className={`iconfont ` + v.icon}></i> 
          <span className="menu-itme-text">{ v.name }</span>
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