import React from 'react'

import { Empty } from 'antd'

export default class NotMatch extends React.Component{
  render() {
    return (
      <div className="card-space" style={{ minHeight: 300,display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
        <Empty />
      </div>
    )
  }
}