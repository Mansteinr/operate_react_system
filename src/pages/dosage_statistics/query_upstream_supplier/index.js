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
  getSupplierAction
} from '@/common/js/store/actionCreators'


class queryUpstreamSupplier extends Component{

  // 查询表单
  formList = [{
    type: 'DateRange',
    label: '选择日期',
    field: 'DateRange',
    placeholder: '请选择日期',
    firstName: 'start',
    lastName: 'end',
    formatter: 'YYYY-MM-DD'
  }, {
    type: 'Select',
    label: '供应商名称',
    field: 'companyName',
    placeholder: '请选择供应商名称'
  }]

  // 确认提交表单数据 子组件传递上来的
  handleFilter = (params) => {
    let { getBalanceSnapshotAction, getChargeLogAction } = this.props, loginName = params.loginName
    
    params.loginNames = [params.loginName]
    delete params.loginName
    getBalanceSnapshotAction(params)
    getChargeLogAction(loginName)
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

  render () {
    let { BalanceSnapshotList, chargeLogList } = this.props
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
        <div className="card-space">
          <ContnentUI
            title="余额快照"
            data={ BalanceSnapshotList }
            renderTableFun={ this.renderBalanceSnapshotTable } />
        </div>
        <div className="card-space">
          <ContnentUI
            title="充值记录"
            data={ chargeLogList }
            renderTableFun={ this.renderChargeLogTable } />
        </div>
      </Fragment>
    )
  }

  componentDidMount () {
    this.props.getSupplierAction()
  }
}

function mapStateToProps (state) {
  return {
    supplierList: state.getIn(['base', 'supplierList'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSupplierAction: () => dispatch(getSupplierAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(queryUpstreamSupplier)