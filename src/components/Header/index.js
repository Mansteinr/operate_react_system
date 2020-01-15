import React, { Component } from 'react'
import { Tabs, message } from 'antd'
import store from '../../store'
import './index.less'

const { TabPane } = Tabs

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0
    let panes = []
    this.state = {
      panes
    }
    
    // 监听state变化，新增tab标签栏
    store.subscribe(() => {
      const state = store.getState()
      var hash = {}
      panes.push(state)
      // 删选 防止重复增加
      panes.forEach((v, k) => {
        if(!hash[v.url]) {
          hash[v.url] = true
        } else {
          panes.splice(k,1)
        }
      })

      this.setState({
        panes,
        activeKey: state.key
      })
    })
  }

  onChange = activeKey => {
    this.setState({ activeKey })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  remove = targetKey => {
    let { activeKey } = this.state, lastIndex
    if(this.state.panes.length === 1) {
      message.warning('最后一个啦！')
      return
    }
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key
      } else {
        activeKey = panes[0].key
      }
    }
    this.setState({ panes, activeKey })
  }

  render() {
    console.log('render')
    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} />
          ))}
        </Tabs>
      </div>
    )
  }
}