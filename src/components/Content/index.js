
import { Empty, Tabs } from 'antd'
import React, { Component, Fragment } from 'react'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default class Content extends Component {
  renderFun = () => {
    console.log(this.props.data)
    if(this.props.data.length) {
      return (
        <Tabs onChange={callback} type="card">
          <TabPane tab="图标" key="1">
            {this.props.renderChartFun()}
          </TabPane>
          <TabPane tab="数据" key="2">
            {this.props.renderTableFun()}
          </TabPane>
        </Tabs>
      )
    } else {
      return <Empty/>
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