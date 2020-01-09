import React, { Component } from 'react'
import { Layout } from 'antd'
import NavLeft from './components/NavLeft'
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
          <Header style={{ background: '#fff', padding: 0 }}>
            {/* <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            /> */}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    )
    // return (
      // <Row className="container">
      //   <Col span={4} className="nav-left">
      //     <NavLeft></NavLeft>
      //   </Col>
      //   <Col span={20} className="main">
      //     <Header>
      //       Header
      //     </Header>
      //     <Row className="content">
      //       {this.props.children}
      //     </Row>
      //   </Col>
      // </Row>
    // )
  }
}