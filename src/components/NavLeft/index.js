
/**
 * 左侧组件
 */
import { Menu } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
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

  handleClick = (item, trueUrl) => {
    let { getMenuItemAction, history } = this.props
    getMenuItemAction(item)
    history.push({ pathname: `/${trueUrl}`})
  }

  // 渲染菜单
  renderMenu = (data) => {
    let { getMenuItemAction, history } = this.props
    if (data) {
      return data.map((v, k) => {
        // 拼接路由i地址
        let trueUrl = v.resourceUrl.split('/')[v.resourceUrl.split('/').length - 1].split('.html')[0],
          routerName = this.props.location.pathname
        
        if (flag && routerName.length === 1) {
          getMenuItemAction(v)
          flag = false
        } else if (routerName.length > 1) {

          if (flag && routerName.indexOf('oneClickLoginDetail') > 0) {
            getMenuItemAction({
              resourceUrl: `${routerName}.html`,
              name: `${routerName.split('/')[2]}详情`,
              key: +new Date()
            })
            flag = false
          }else if (flag && trueUrl === routerName.split('/')[1]) {
            getMenuItemAction(v)
            history.push({
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
              { this.renderMenu(v.childResource) }
            </SubMenu>
          )
        }
        return <Menu.Item title={v.name} key={v.id} onClick={() => this.handleClick(v, trueUrl)}>
          <i className={`iconfont ` + v.icon}></i> { v.name}
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


// 这一部分是 react-redux的内容
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

// withRouter之后就可以用this.props.location.pathname
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLeft))