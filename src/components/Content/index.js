import React, { Component, Fragment } from 'react'
import { Empty, Tabs } from 'antd'
const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default class Content extends Component {
  renderFun = () => {
    let data = this.props.data
    if (data.length) {
      return (
        <Tabs onChange={callback} type="card" size={'small'}>
          <TabPane tab="图标" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="数据" key="2">
            Content of Tab Pane 2
         </TabPane>
        </Tabs>
      )
    } else {
      return <Empty />
    }

  }
  render() {
    return (
      <Fragment>
        <div className="card-title"> 查询结果 </div>
        <div className="card-content">
          {this.renderFun()}
        </div>
      </Fragment>
    )
  }
}