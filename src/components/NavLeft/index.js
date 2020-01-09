
import API from '../../config'
import Axios from '../../axios'
import { Menu, Icon, Button } from 'antd'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.less'

const { SubMenu } = Menu

export default class NavLeft extends Component {

  state = {
    collapsed: false
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  // 渲染菜单
  renderMenu = (data) => {
    return data.map(v => {
      console.log(v)
      if (v.childResource) {
        return (
          <SubMenu key={v.id}
            title={
              <span>
                <span className={`iconfont ` +  v.icon }></span>
                {v.name}
              </span>
            } >

            {this.renderMenu(v.childResource)}
          </SubMenu>
        )
      }
      return <Menu.Item title={v.name} key={v.id}>
         <span className={ `iconfont ` + v.icon }></span>上游服务占比分析
        {v.name}
      </Menu.Item>
    })
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['325']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
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
        menuTreeNode
      })
    })
  }


}