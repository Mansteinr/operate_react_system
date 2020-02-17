import { connect } from 'react-redux'
import TableUI from '@/components/Table'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import { renderTableFooter, sortOrderTable } from '@/utils'
import {
  getBalanceSnapshotAction,
  getChargeLogAction
} from '@/pages/dosage_statistics/store/actionCreators'
import {
  getBaseCustomersAction
} from '@/common/js/store/actionCreators'


class queryFinance extends Component{
  // 查询表单
  state = {
    formList: [{
      type: 'DateRange',
      label: '选择日期',
      field: 'DateRange',
      placeholder: '请选择日期',
      firstName: 'start',
      lastName: 'end',
      formatter: 'YYYY-MM-DD'
    }, {
      type: 'Select',
      mode: '',
      isAll: false,
      label: '客户名称',
      field: 'loginName',
      notRequestService: true,
      selectLable: 'loginName',
      selectText: 'customerName',
      placeholder: '请选择客户名称'
    }]
  }

  // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    let { getBalanceSnapshotAction, getChargeLogAction } = this.props, loginName = params.loginName
    
    params.loginNames = [params.loginName]
    delete params.loginName
    getBalanceSnapshotAction(params)
    if (!this.state.formList[1].isAll) {
      getChargeLogAction(loginName)
    }
  }

  renderBalanceSnapshotTable = () => {
    const data = this.props.BalanceSnapshotList,
      columns = [{
        title: '时间',
        dataIndex: 'dateTime',
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            firstColumns: '总计',
            target: 'dayTime'
          })
        }
      }, {
        title: '余额',
        dataIndex: 'balance',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'balance')
        },
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            target: 'balance'
          })
        }
      }, {
        title: '差额',
        dataIndex: 'diffValue',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'diffValue')
        },
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            target: 'diffValue'
          })
        }
      }]
    return <TableUI rowKey={'dateTime'} dataSource={ data } columns={ columns } />
  }

  renderChargeLogTable = () => {
    const data = this.props.chargeLogList,
      columns = [{
        title: '充值时间',
        dataIndex: 'dateTime',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'dateTime')
        }
      }, {
        title: '当前余额',
        dataIndex: 'curBalance',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'curBalance')
        }
      }, {
        title: '实充金额',
        dataIndex: 'actualRechargeAmount',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'actualRechargeAmount')
        }
      }, {
        title: '附加充值金额',
        dataIndex: 'extRechargeAmount',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'extRechargeAmount')
        }
      }, {
        title: '包年包月充值金额',
        dataIndex: 'packRechargeAmount',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'packRechargeAmount')
        }
      }, {
        title: '充前金额',
        dataIndex: 'preBalance',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'preBalance')
        }
      }, {
        title: '经办人',
        dataIndex: 'operator',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'operator')
        }
      }, {
        title: '说明',
        dataIndex: 'remark',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'remark')
        }
    }]
    return <TableUI rowKey={'dateTime'} dataSource={ data } columns={ columns } />
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.changeDate) {
      if (nextProps.changeDate[0] === nextProps.changeDate[1]) {
        nextState.formList[1].mode = 'multiple'
        nextState.formList[1].isAll = true
      } else {
        nextState.formList[1].mode = ''
        nextState.formList[1].isAll = false
      }
    }
    return true
  }

  render () {
    let { BalanceSnapshotList, chargeLogList } = this.props
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.state.formList } filterSubmit={ this.handleFilter } />
        </div>
        <div className="card-space">
          <ContnentUI
            title="余额快照"
            data={ BalanceSnapshotList }
            renderTableFun={ this.renderBalanceSnapshotTable } />
        </div>
        <div className="card-space" style={{display: this.state.formList[1].isAll ? 'none' : 'block'}}>
          <ContnentUI
            title="充值记录"
            data={ chargeLogList }
            renderTableFun={ this.renderChargeLogTable } />
        </div>
      </Fragment>
    )
  }

  componentDidMount () {
    this.props.getBaseCustomersAction()
  }
}

function mapStateToProps (state) {
  return {
    BalanceSnapshotList: state.getIn(['dosageStatistics', 'BalanceSnapshotList']),
    chargeLogList: state.getIn(['dosageStatistics', 'chargeLogList']),
    changeDate: state.getIn(['base', 'changeDate']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBaseCustomersAction: () => dispatch(getBaseCustomersAction()),
    getBalanceSnapshotAction: (data) => dispatch(getBalanceSnapshotAction(data)),
    getChargeLogAction: (data) => dispatch(getChargeLogAction(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(queryFinance)