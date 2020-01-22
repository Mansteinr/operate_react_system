import React, { Component } from 'react'
import { Table, Divider, Tag, pagination } from 'antd'
export default class TableUI extends Component {

  state = {
    pageSizeNum: 10
  }

  render() {
    // let pageSizeNum = 10

    

    // onShowSizeChange = (current, size) => {
    //   console.log(current, size)
    // }
    return (
      <Table
        pagination={{
          pageSize: this.state.pageSizeNum,
          showSizeChanger: true,
          showQuickJumper: true,
          position: 'bottom',
          onShowSizeChange: (current, size) => {
            this.setState({
              pageSizeNum: size
            })
          },
          showTotal: (total, range) => {
            return `显示第 ${range[0]} 到第 ${range[1]} 条记录，总共 ${total} 条记录，每页显示 ${this.state.pageSizeNum}  条记录            `
          }
        }}

        rowKey={this.props.rowKey}
        columns={this.props.columns}
        dataSource={this.props.dataSource}
      />
    )
  }
} 