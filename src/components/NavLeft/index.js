
/**
 * 左侧组件
 */
import { Menu } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter  } from 'react-router'
import { INIT_MENUS_LIST } from './store/actionTypes'
import { getMenuItemAction } from './store/actionCreators'

import './index.less'

let { SubMenu } = Menu, flag = true

class NavLeft extends Component {

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
    this.props.getMenuItemAction(item)
  }

  // 渲染菜单
  renderMenu = (data) => {
  //  console.log(this.props.location.pathname.length)
    let { getMenuItemAction } = this.props
    if (data) {
      return data.map((v, k) => {
        // 拼接路由i地址
        let trueUrl = v.resourceUrl.split('/')[v.resourceUrl.split('/').length - 1].split('.html')[0],
            routerName = this.props.location.pathname

        if (flag && routerName.length === 1) {
          getMenuItemAction(v)
          flag = false
        } else if (routerName.length > 1) {

          if (flag && trueUrl === routerName.split('/')[1]) {
            getMenuItemAction(v)
            this.props.history.push({
              routerName
            })
            flag = false
          }
          
        }
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
          <NavLink to={ trueUrl }><i className={`iconfont ` + v.icon}></i> { v.name}</NavLink>
        </Menu.Item>
      })
    }
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
        { this.renderMenu(this.props.menuTreeList) }
      </Menu>
    )
  }

  // 请求数据
  componentDidMount () {
    this.props.initMenusList()
  }

}

function mapStateToProps (state) {
  return {
    menuActive: state.getIn(['navLeft', 'menuActive']), // // 引入redux-immutable后写法
    // menuActive: state.get('navLeft').get('menuActive'), // // 引入redux-immutable后写法
    // menuActive: state.navLeft.get('menuActive'), // // 引入immutable后写法
    // menuActive: state.navLeft.menuActive, //// 引入immutable前写法
    menuTreeList: state.getIn(['navLeft', 'menuTreeList'])
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    initMenusList:()=>{
      dispatch({type:INIT_MENUS_LIST})
    },
    getMenuItemAction: (data) => {
      dispatch(getMenuItemAction(data))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLeft))