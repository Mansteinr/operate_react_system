import interfaceApi from './interface.json'
/*默认使用协议*/
const protocol = 'http', mode = 'production',
      baseConfig = {
  protocols: {
    http: 'http://',
    https: 'https://'
  }
}
/*设置api转换*/
let apiFormat = (api = '', hostkey = 'upapi', pt = protocol) => {
  return baseConfig.protocols[pt] + interfaceApi[mode][hostkey] + api
}

const api = {
  base: {
    login: apiFormat('login/doLogin', 'rbacapi', mode === 'production' ? 'https' : 'http'),
    loginout: apiFormat('logout/ajaxLogout', 'rbacapi', mode === 'production' ? 'https' : 'http'),
    getVerifyCode: apiFormat('login/getVerifyCode', 'rbacapi', mode === 'production' ? 'https' : 'http'),
    querymenus: apiFormat('sys/resource/querySubSystemMenuList', 'rbacapi', mode === 'production' ? 'https' : 'http'),
    projectchoose: apiFormat('boss2-0-web/rbac-web/choose.html', 'rbacweb', mode === 'production' ? 'https' : 'http'),
    loginchannel: apiFormat('boss2-0-web/rbac-web/loginChannel.html', 'rbacweb', mode === 'production' ? 'https' : 'http'),
    imageapi: interfaceApi[mode].imageapi,
    localMTK: '64508a57-bcc1-41a6-9eec-9f434a7fb7a7'
  },
  upApi: {
    /*！能力域api*/
    logs: apiFormat('operator/logs'), // 获取行业类型
    services: apiFormat('operator/services'), // 获取接口服务
    logDetail: apiFormat('operator/logDetail'), // g供应商
    customers: apiFormat('operator/customers'), // 所以的客户名称
    hasServices: apiFormat('operator/hasServices'), // 客户拥有的服务
    companys: apiFormat('operator/supplier/companys'), // g供应商
    businessTypes: apiFormat('operator/businessTypes'), // 获取行业类型
    logByMvTrackId: apiFormat('operator/logByMvTrackId'),
    queryByDate: apiFormat('operator/margin/queryByDate'), /* 利润分析 */
    getCustomerChargeInfo: apiFormat('operator/up/getCustomerChargeInfo'), // g供应商
    getOutServiceChargeInfo: apiFormat('operator/up/getOutServiceChargeInfo'),
    getAllOutServiceChargeInfo: apiFormat('operator/up/getAllOutServiceChargeInfo'), /*--获取服务对应上游信息的每天详细统计信息(导出excel表格)*/
    getCustomersByWebServiceNames: apiFormat('operator/getCustomersByWebServiceNames'), // g供应商
    getOutServiceChargeInfoByDay: apiFormat('operator/up/getOutServiceChargeInfoByDay'),
    getOutServiceChargeInfoBySupplier: apiFormat('operator/up/getOutServiceChargeInfoBySupplier') // g供应商
  },
  downApi: {
    UsageByName: apiFormat('operator/down/UsageByName'),
    UsageByDate: apiFormat('operator/down/UsageByDate'), // 
    chargeLog: apiFormat('operator/accounting/chargeLog'), // 余额快照
    UsageByCustomer: apiFormat('operator/down/UsageByCustomer'),
    UsageByResultNew: apiFormat('operator/down/UsageByResultNew'),
    getBalanceSnapshot: apiFormat('operator/accounting/getBalanceSnapshot') // 余额快照
  },
  secureApi: { // 安全中心
    allWords: apiFormat('secure/web/word/allWords', 'safaCenterapi'), /*查询所有的敏感词*/
    wordInsert: apiFormat('secure/web/word/insert', 'safaCenterapi'), /*新增敏感词*/
    wordDelete: apiFormat('secure/web/word/delete', 'safaCenterapi'),  /*删除敏感词*/
    wordUpdate: apiFormat('secure/web/word/update', 'safaCenterapi'), /*新增敏感词*/
    allRegIns: apiFormat('secure/web/regIns/allRegIns', 'safaCenterapi'), /*所有的规则实列*/
    insertRegIns: apiFormat('secure/web/regIns/insert', 'safaCenterapi'), /*新增规则实列*/
    deleteRegIns: apiFormat('secure/web/regIns/delete', 'safaCenterapi'), /*删除规则实列*/
    updateRegIns: apiFormat('secure/web/regIns/update', 'safaCenterapi'), /*更新规则实列*/
    paramRecord: apiFormat('secure/web/record/paramRecord', 'safaCenterapi'), /* 参数拦截例 */
    allService: apiFormat('secure/web/service/allService', 'safaCenterapi'), /*获取所有的服务*/
    deleteService: apiFormat('secure/web/service/delete', 'safaCenterapi'), /*删除服务*/
    insertService: apiFormat('secure/web/service/insert', 'safaCenterapi'), /*新增服务*/
    subService: apiFormat('secure/web/service/subService', 'safaCenterapi'), /*服务直接子服务*/
    updateService: apiFormat('secure/web/service/update', 'safaCenterapi'), /*更新服务*/
    insertRegulars: apiFormat('secure/web/regular/insert', 'safaCenterapi'), /*新增规则*/
    deleteRegulars: apiFormat('secure/web/regular/delete', 'safaCenterapi'), /*删除规则*/
    updateRegulars: apiFormat('secure/web/regular/update', 'safaCenterapi'), /*更新规则*/
    allRegulars: apiFormat('secure/web/regular/allRegulars', 'safaCenterapi'), /*获取所有规则*/
    directService: apiFormat('secure/web/service/directService', 'safaCenterapi'), /*获取所有子服务*/
    recoverUseful: apiFormat('secure/web/record/recoverUseful', 'safaCenterapi'), /* 告警恢复 */
  },
  qualityanalyApi: { // 平台质量分析
    supplierRealTime: apiFormat('qualityanalyze/supplier/realTime'),  /* 供应商（上游）质量分析  实时数据 */
    customerRealTime: apiFormat('qualityanalyze/customer/realTime'),  /* 客户(下游)质量分析 实时数据 */
    supplierHistory: apiFormat('qualityanalyze/supplier/history'), /* 供应商（上游）质量分析 历史数据 */
    customerHistory: apiFormat('qualityanalyze/customer/history'), /* 客户（上游）质量分析 历史数据 */
  },
  financeApi: {
    trackDetail: apiFormat('operator/finance/trackDetail'), 
    upStreamCount: apiFormat('operator/finance/upStreamCount'),  /* 组合服务上游调用量 */
    upStreamDetail: apiFormat('operator/finance/upStreamDetail'),  /* 下游客户调用明细 */
    mobileOperator: apiFormat('operator/finance/mobileOperator')
  },
  // boss提供的接口
  supplierApi: {
    queryPipeList: apiFormat('operator/supplier/queryPipeList'),
    querySupInfoList: apiFormat('operator/supplier/querySupInfoList'),
    querySupServiceList: apiFormat('operator/supplier/querySupServiceList')
  },
  persistApi: {
    persistDel: apiFormat('operator/persist/del'),
    persistQuery: apiFormat('operator/persist/query'),
    persistInfos: apiFormat('operator/persist/persistInfos')
  },
  paramsApi: {
    getIP: apiFormat('/operator/slb/getIP'), /*获取ip黑名单*/
    addIPBatch: apiFormat('/operator/slb/addIPBatch'), /*新增ip黑名单*/
    delIPBatch: apiFormat('/operator/slb/delIPBatch'), /*新增ip黑名单*/
    getAll: apiFormat('operator/ServiceNameParams/getAll'), /*配置管理获取所有的服务名*/
    getParam: apiFormat('operator/ServiceNameParams/getParam'), /*配置管理获取所有的参数*/
    getUpServerLimitFlag: apiFormat('operator/limitOfCXZX/getUpServerLimitFlag'), /*获取限制开关*/
    getUpServerLimitCount: apiFormat('operator/limitOfCXZX/getUpServerLimitCount'), /*获取限制总量*/
    getCustomerLimitCount: apiFormat('operator/limitOfCXZX/getCustomerLimitCount'), /*获取客户总量*/
    setUpServerLimitCount: apiFormat('operator/limitOfCXZX/setUpServerLimitCount'), /*获取客户总量*/
    setUpServerLimitFlag: apiFormat('operator/limitOfCXZX/setUpServerLimitFlag'), /*获取客户总量*/
    getLimitServiceCondition: apiFormat('operator/limitOfCXZX/getLimitServiceCondition'), /*获取客户使用总量*/
    setCustomerLimitCount: apiFormat('operator/limitOfCXZX/setCustomerLimitCount'), /*获取客户使用总量*/
    addServiceNameAndParams: apiFormat('operator/ServiceNameParams/addServiceNameAndParams'), /*配置管理新增的服务名*/
    queryParamsByServiceName: apiFormat('operator/ServiceNameParams/queryParamsByServiceName'), /*根据服务名查询参数*/
    deleteByServiceNameAndParamName: apiFormat('operator/ServiceNameParams/deleteByServiceNameAndParamName'), /*配置管理删除的服务名*/
  },
  callbackServiceApi: { // 异步服务
    upCount: apiFormat('callbackService/operator/bill/upCount'), /* 数据源账单 */
    upDetail: apiFormat('callbackService/operator/bill/upDetail'), /* 利润查询 */
    marginCount: apiFormat('callbackService/operator/bill/marginCount'), /*  利润查询 */
    getDecryptData: apiFormat('callbackService/operator/getDecryptData'), /* 订单号查询车保报告 */
    marginDetail: apiFormat('callbackService/operator/bill/marginDetail'), /* 利润查询 */
    customerCount: apiFormat('callbackService/operator/bill/customerCount'), /* 数据源账单 */
    getOrderInfoById: apiFormat('callbackService/operator/getOrderInfoById'),  /* 订单号查看订单状态 */
    customerDetail: apiFormat('callbackService/operator/bill/customerDetail'), /* 利润查询 */
    getAllAbilityInfo: apiFormat('callbackService/operator/getAllAbilityInfo'), /* 订单号查询车保报告 */
    getOrderInfoByVin: apiFormat('callbackService/operator/getOrderInfoByVin'),  /* vin查询符合条件的订单信息 */
    getAbilitySupplilerInfo: apiFormat('callbackService/operator/getAbilitySupplilerInfo'), /* 订单号查询车保报告 */
    alterAbilitySupplilerInfo: apiFormat('callbackService/operator/alterAbilitySupplilerInfo'), /* 订单号查询车保报告 */
  },
  lightSignIn: { // 一键登录
    customers: apiFormat('operator/lightSignIn/customers'),  // 获取一键登录所有的客户
    appInfo: apiFormat('operator/lightSignIn/appInfo'),  /* app信息 */
    secret: apiFormat('operator/lightSignIn/secret'),  /* 查看appKey */
  },
  wechatAPI: { // 微信公众号
    customerInfo: apiFormat('wechatService/customerInfo/query', 'wechatapi'),  // 获取微信客户
    customerInfoEdit: apiFormat('wechatService/customerInfo/edit', 'wechatapi'),  /* 编辑微信客户 */
    customerInfoAdd: apiFormat('wechatService/customerInfo/add', 'wechatapi'),  /* 新增微信客户 */
    customerInfoDel: apiFormat('wechatService/customerInfo/del', 'wechatapi'),  /* 删除微信客户 */
    serviceInfoQuery: apiFormat('wechatService/serviceInfo/query', 'wechatapi'),  /* 查询微信服务 */
    serviceInfoDel: apiFormat('wechatService/serviceInfo/del', 'wechatapi'),  /* 删除微信服务 */
    serviceInfoAdd: apiFormat('wechatService/serviceInfo/add', 'wechatapi'),  /* 新增微信服务 */
    serviceInfoEdit: apiFormat('wechatService/serviceInfo/edit', 'wechatapi'),  /* 编辑微信服务 */
    customerServiceInfoQuery: apiFormat('wechatService/customerServiceInfo/query', 'wechatapi'),  /* 查询微信服务实例 */
    customerServiceInfoAdd: apiFormat('wechatService/customerServiceInfo/add', 'wechatapi'),  /* 查询微信服务实例 */
    customerServiceInfoEdit: apiFormat('wechatService/customerServiceInfo/alterAuthTotal', 'wechatapi'),  /* 查询微信服务实例 */
    customerServiceInfoDel: apiFormat('wechatService/customerServiceInfo/del', 'wechatapi'),  /* 查询微信服务实例 */
    trackQuery: apiFormat('wechatService/track/query', 'wechatapi'),  /* 查询微信服务实例 */
  }
}
export default api
