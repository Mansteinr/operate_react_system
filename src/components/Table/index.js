import React, { Component } from 'react'
import { Table } from 'antd'
export default class TableUI extends Component {

  state = {
    pageSizeNum: 10
  }

  render() {
    return (
      <Table
        pagination={{
          pageSize: this.state.pageSizeNum,
          showSizeChanger: true,
          position: 'bottom',
          onShowSizeChange: (current, size) => {
            this.setState({
              pageSizeNum: size
            })
          },
          showTotal: (total, range) => {
            return `显示第 ${range[0]} 到第 ${range[1]} 条记录，总共 ${total} 条记`
          }
        }}

        rowKey={(record) => {
          // 防止rowKey有重复的
          return `${record[this.props.rowKey]}${Math.random()}`
        } }
        columns={ this.props.columns }
        dataSource={ this.props.dataSource }
      />
    )
  }
} 