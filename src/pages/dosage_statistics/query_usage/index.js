import { connect } from 'react-redux'
import React, { Component } from 'react'


class queryUsage extends Component{
  render () {
    return (
      <div>this is query_usage</div>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(queryUsage)