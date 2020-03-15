
import { Empty, Tabs } from 'antd'
import React, { Component, Fragment } from 'react'

const { TabPane } = Tabs

export default class Content extends Component {
  renderFun = () => {
    let { data, renderChartFun, renderTableFun,renderDomFun } = this.props
    if (data && data.length) {
      if (renderChartFun && renderTableFun) {
        return (
          <Tabs type="card">
            <TabPane tab="图标" key="1">
              { renderChartFun() }
            </TabPane>
            <TabPane tab="数据" key="2">
              { renderTableFun() }
            </TabPane>
          </Tabs>
        )
      } else if (renderChartFun) {
        return <div> {renderChartFun()} </div>
      } else if (renderTableFun) {
        return <div> {renderTableFun()} </div>
      }
    } else if (renderDomFun) {
      return <div> {renderDomFun()} </div>
    } else {
      return <Empty/>
    }
  }
  render() {
    return (
      <Fragment>
        <div className="card-title"> { this.props.title || '查询结果' } </div>
        <div className="card-content">
          { this.renderFun() }
        </div>
      </Fragment>
    )
  }
}