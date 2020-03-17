
import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import React, { Component } from 'react'
import ContnentUI from '@/components/Content'
import { Button, Modal,Row, Col, Popconfirm } from 'antd'
import { getAllSensitiveWordAction, deleteSensitiveWordAction  } from '../store/actionCreators'

class sensitiveWord extends Component {

  // 更新
  handleUpdate = () => {

  }
  renderSensitiveWordTable = () => {
    let data = this.props.allSensitiveWordList,
        columns = [{
          title: '敏感词',
          dataIndex: 'wordKey'
        }, {
          title: '描述信息',
          dataIndex: 'wordDes'
        }, {
          title: '更新时间',
          dataIndex: 'updateTime'
        }, {
          title: '关联服务及参数',
          dataIndex: 'serviceParams',
          render: (value, record, index) => {
            let spanList = []
            if (value && value.length) {
              value.forEach((v, k) => {
                spanList.push(<span key={Math.random()} title={`${v.serviceName} : ${v.paramName}`} className="param-item">{`${v.serviceName}: ${v.paramName}`}</span>)
              })
            }
            return <div className="param-item-wrapper">{spanList}</div>
          }
        }, {
          title: '操作',
          render: (value, record, index) => <div>
            <Popconfirm okText="确定" cancelText="取消" title={`确认删除${record.wordKey}?`} onConfirm={() => this.props.deleteSensitiveWordAction({wordId:record.wordId})}>
              <span className="span-link">删除</span>
            </Popconfirm>
            <span onClick={() => this.handleUpdate(value)} className="span-link">更新</span> 
          </div>
        }]

        return <TableUI rowKey={'serviceNameCh'} dataSource={ data } columns={ columns } />
  }
  render() {
    return (
      <div className="card-space">
        <div className="button-group">
          <Button onClick={ this.addFun } type="primary">新增</Button>
        </div>
        <ContnentUI
          data={ this.props.allSensitiveWordList }
          renderTableFun={ this.renderSensitiveWordTable } />
      </div>
    )
  }

  componentDidMount() {
    this.props.getAllSensitiveWordAction()
  }
  
}

const mapStateToProps = (state) => {
  return {
    allSensitiveWordList: state.getIn(['security', 'allSensitiveWordList']),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteSensitiveWordAction: (data) => dispatch(deleteSensitiveWordAction(data)),
    getAllSensitiveWordAction: () => dispatch(getAllSensitiveWordAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(sensitiveWord)