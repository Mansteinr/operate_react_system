import { connect } from 'react-redux'
import Charts from '@/components/Charts'
import TableUI from '@/components/Table'
import InquiryUI from '@/components/Inquiry'
import ContnentUI from '@/components/Content'
import React, { Component, Fragment } from 'react'
import { renderTableFooter, sortOrderTable } from '@/utils'
import {
  getOutServiceChargeInfoBySupplierAction
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
    let { getOutServiceChargeInfoBySupplierAction } = this.props
    getOutServiceChargeInfoBySupplierAction(params)
  }

  renderChargeInfoBySupplierTable = () => {
    let data = this.props.dayCompanyList,
      columns = [{
        title: '供应商名称',
        dataIndex: 'company',
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            firstColumns: '总计',
            target: 'company'
          })
        }
      }, {
        title: '时间',
        dataIndex: 'dayTime',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'dayTime')
        },
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            firstColumns: '-',
            target: 'dayTime'
          })
        }
      }, {
        title: '服务名称',
        dataIndex: 'serviceNameZh',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'serviceNameZh')
        },
        render: (value, record, index) => {
          return renderTableFooter({
            value: `${value}(${record.serviceName})`,
            data,
            index,
            firstColumns: '-',
            target: 'serviceNameZh'
          })
        }
      }, {
        title: '调用条数',
        dataIndex: 'usedCount',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'usedCount')
        },
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            target: 'usedCount'
          })
        }
      }, {
        title: '计费调用量',
        dataIndex: 'chargeUsedCount',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'chargeUsedCount')
        },
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            target: 'chargeUsedCount'
          })
        }
      }, {
        title: '不计费调用量',
        dataIndex: '',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'chargeUsedCount')
        },
        render: (value, record, index) => {
          return record.usedCount - value
        }
      }, {
        title: '小视入账',
        dataIndex: 'cost',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'cost')
        },
        render: (value, record, index) => {
          return renderTableFooter({
            value: value,
            data,
            index,
            target: 'cost'
          })
        }
      }]
    return <TableUI rowKey={'dateTime'} dataSource={ data } columns={ columns } />
  }

  renderChargeInfoBySupplierChart = () => {
    let data = this.props.dayCompanyList,
    option = {
      title: '总体情况-按日期统计',
      xAxisData: [],
      series: []
    }, xFiled = {}, finalArr = {} // 将所有的服务名都存储在该对象中
    // 组装参数
    data.forEach(v => {
      if (!finalArr[v.serviceName]) { // 检测该服务名是否已经存储在finalArr中 否则存  反之不存
        finalArr[v.serviceName] = {
          name: v.serviceNameZh,
          dataArr: []
        }
      }
      if(xFiled[v.dayTime]) { // 如果日期存在 则将对应的服务名机器对应的使用量生产key value
        xFiled[v.dayTime][v.serviceName] = v.usedCount
      } else {
        xFiled[v.dayTime] = {} // //如果日期不存在  则生成一个空对象 
        xFiled[v.dayTime][v.serviceName] = v.usedCount // 再将对应的服务名及对应的使用量生成key value
      }
     
    })

    let nuqinexFild = [] // 去重x轴

    for (let k in xFiled) { // 循环xFiled中的每一项 
      nuqinexFild.push(k)
      for (let k1 in finalArr) { // 循环finalArr中的每一项 
        if (xFiled[k][k1]) { 
          finalArr[k1].dataArr.push(xFiled[k][k1])
        } else {
           finalArr[k1].dataArr.push(0)
        }
      }
    }
    
    for (let key in finalArr) {
      option.series.push({
        name: finalArr[key].name,
        type: 'line',
        data: finalArr[key].dataArr
      })
     }
    option.xAxisData = nuqinexFild
    return <Charts option={option} />
  }

  renderServiceBySupplierTable = () => {
    let data = this.props.serviceCompanyList,
      columns = [{
        title: '供应商名称',
        dataIndex: 'company'
      }, {
        title: '服务名称',
        dataIndex: 'serviceNameZh',
        render: (value, record, index) => {
          return `${value}(${record['serviceName']})`
        }
      }, {
        title: '调用总量（条）',
        dataIndex: 'usedCount',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'usedCount')
        }
      }, {
        title: '计费调用量（条）',
        dataIndex: 'chargeUsedCount',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'chargeUsedCount')
        }
      }, {
        title: '不计费调用量（条）',
        dataIndex: '',
        sorter: (a, b) => {
          return sortOrderTable(a, b, 'packRechargeAmount')
        },
        render: (value, record, index) => {
          return  record.usedCount - record.chargeUsedCount
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
    console.log('renderServiceBySupplierTablerenderServiceBySupplierTablerenderServiceBySupplierTablerenderServiceBySupplierTablerenderServiceBySupplierTable')
    return <TableUI rowKey={'company'} dataSource={ data } columns={ columns } />
  }

  render () {
    const { dayCompanyList, serviceCompanyList } = this.props
    return (
      <Fragment>
        <div className="card-space">
          <InquiryUI formList={ this.formList } filterSubmit={ this.handleFilter } />
        </div>
        <div className="card-space">
          <ContnentUI
            data={ dayCompanyList }
            renderChartFun={ this.renderChargeInfoBySupplierChart }
            renderTableFun={ this.renderChargeInfoBySupplierTable } />
        </div>
        <div className="card-space">
          <ContnentUI
            data={ serviceCompanyList }
            renderTableFun={ this.renderServiceBySupplierTable } />
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
    supplierList: state.getIn(['base', 'supplierList']),
    dayCompanyList: state.getIn(['dosageStatistics', 'outServiceChargeInfoBySupplierList', 'dayCompanyList']),
    serviceCompanyList: state.getIn(['dosageStatistics', 'outServiceChargeInfoBySupplierList', 'serviceCompanyList'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOutServiceChargeInfoBySupplierAction: (data) => dispatch(getOutServiceChargeInfoBySupplierAction(data)),
    getSupplierAction: () => dispatch(getSupplierAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(queryUpstreamSupplier)