import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd'
export default class TableUI extends Component {


  getSummaries = ((params, index) => {
    console.log(params, index)
    // if(params.length) {
   
    //   params.forEach(v => {
    //     return 'op'
    //   })
       
    // }
  })

  render() {
    return (
      <Table
      rowKey = { this.props.rowKey }
      columns={ this.props.columns } 
      dataSource={ this.props.dataSource }
      // footer = { this.getSummaries }
      />
    )
  }
} 