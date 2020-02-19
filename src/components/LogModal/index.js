// guid 弹框

import { Modal } from 'antd'
import React, { Component } from 'react'

import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

let _this = this
export default  class logsModal extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  
  handleOk = e => {
    this.setState({
      visible: false,
    });
    this.props.changeVisible(false)
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
    this.props.changeVisible(false)
  }

  render() {
    return (
      <Modal
       style={{ width: 700}}
        destroyOnClose
        title={this.props.title || 'Guid查询'}
        visible={ this.state.visible }
        onOk={ this.handleOk }
        onCancel={ this.handleCancel }
      >
        <div id="jsoneditor"></div>
      </Modal>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    nextState.visible = nextProps.visible
    if (nextProps.data) {
      setTimeout(() => {
        let container = document.getElementById("jsoneditor"),
          options = {
            mode: 'tree'
          },
        editor = new JSONEditor(container, options)
      editor.set(nextProps.data)
      }, 100)
    }
  
    return true
  }
}