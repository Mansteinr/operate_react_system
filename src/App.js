import React from 'react'

@import '~antd/dist/antd.css'

export default class App extends React.Component{
  render () {
    return (
      <div>
        {/* 路由 可以接受菜单也可以接受详情页面 */}
        {this.props.children}
      </div>
    )
  }
}