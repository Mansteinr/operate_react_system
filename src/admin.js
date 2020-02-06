import React, { Component } from 'react'
import { Layout } from 'antd'
import NavLeft from './components/NavLeft'
import CustomerHeader from './components/Header'
import './common/css/index.less'

const { Header, Sider, Content } = Layout;

export default class Admin extends Component {
  
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Header  onClick={this.toggle}>
            <span className={!this.state.collapsed? `iconfont icon-tubiaozhizuomoban` : 'iconfont icon-tubiaozhizuomoban active'}></span>
          </Header>
          <NavLeft></NavLeft>
        </Sider>
        <Layout>
          <CustomerHeader></CustomerHeader>
          <Content>
            {/* 路由 对应的是router.js中的结构 */}
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}