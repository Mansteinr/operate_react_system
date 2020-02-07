/**
 * 头部组件
*/
import { Tabs, message } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter  } from 'react-router'
import { getMenuItemAction } from '@/components/NavLeft/store/actionCreators'
import './index.less'

const { TabPane } = Tabs
let _this = null,  panes = []
class Header extends Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0
    this.state = {
      panes: []
    }
    _this = this
  }


  onChange = activeKey => {
    this.setState({ activeKey })
    this.props.history.push({
      pathname: `/${activeKey.split('@')[1]}`
    })
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

  renderTabPane = data => {
   return data.map(pane => (
      // 用@分割， 到时候容易取地址
      <TabPane tab={pane.title} key={`${pane.key}@${pane.url}`} /> 
    ))
  }

  render() {
    return (
      // <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          { this.renderTabPane(this.state.panes) }
        </Tabs>
      // </div>
    )
  }
}



function mapStateToProps (state) {
  let menuActive = state.getIn(['navLeft', 'menuActive']), hash = {}
  
  if (menuActive.title) {
    panes.push(menuActive)
    panes.forEach((v, k) => {
      if(!hash[v.url]) {
        hash[v.url] = true
      } else {
        panes.splice(k,1)
      }
    })
    _this.setState({
      panes,
      activeKey:`${menuActive.key}@${menuActive.url}`
    })
  }
    
  return {
    menuActive
  }
}

function mapDispatchToProps (dispatch) {
  
  return {
    getMenuItemAction: (data) => {
      dispatch(getMenuItemAction(data))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))