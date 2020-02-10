import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContnentUI from '@/components/Content'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Upload,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  message,
  Radio
} from 'antd'

const { Option } = Select
const { TextArea } = Input

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 / 1024 < 20;
  if (!isLt2M) {
    message.error('图片不能大于20kb')
  }
  return isLt2M
}

class oneClickLoginAdd extends Component{
  state = {
    loading: false,
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      )
    }
  }
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  renderDomFun = () => {
 
    const { getFieldDecorator } = this.props.form,

    formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 12 }
      }
    }

    const { imageUrl } = this.state
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
 
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="appId" hasFeedback>
          {getFieldDecorator('appId', {
            rules: [{
                required: true,
                message: 'appId不能为空'
              }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="appKey" hasFeedback>
          {getFieldDecorator('appKey', {
            rules: [{
                required: true,
                message: 'appKey不能为空'
              }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="客户名称" hasFeedback>
          {getFieldDecorator('loginName', {
            rules: [{
                required: true,
                message: '请选择客户名称'
              }]
          })( <Select
            showSearch
            placeholder="请选择客户名称"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="应用名称" hasFeedback>
          {getFieldDecorator('appName', {
            rules: [{
                required: true,
                message: 'appName不能为空'
              }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="所属行业" hasFeedback>
          {getFieldDecorator('appBusiness', {
            rules: [{
                required: true,
                message: '请选择所属行业'
              }]
          })( <Select
            showSearch
            placeholder="请选择所属行业"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="电子商务">电子商务</Option>
            <Option value="在线社区">在线社区</Option>
            <Option value="房地产">房地产</Option>
            <Option value="医疗">医疗</Option>
            <Option value="交通汽车">交通汽车</Option>
            <Option value="旅游">旅游</Option>
            <Option value="游戏">游戏</Option>
            <Option value="教育">教育</Option>
            <Option value="IT硬件">IT硬件</Option>
            <Option value="IT软件服务">IT软件服务</Option>
            <Option value="文化出版">文化出版</Option>
            <Option value="生活信息">生活信息</Option>
            <Option value="其他">其他</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="应用类型" hasFeedback>
          {getFieldDecorator('appType', {
            rules: [{
                required: true,
                message: '请选择应用类型'
              }]
          })( <Select
            showSearch
            placeholder="请选择应用类型"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="电商购物">电商购物</Option>
            <Option value="通讯社交">通讯社交</Option>
            <Option value="生活休闲">生活休闲</Option>
            <Option value="旅游导航">旅游导航</Option>
            <Option value="健康医疗">健康医疗</Option>
            <Option value="教育学习">教育学习</Option>
            <Option value="金融理财">金融理财</Option>
            <Option value="办公商务">办公商务</Option>
            <Option value="影视收听">影视收听</Option>
            <Option value="阅读新闻">阅读新闻</Option>
            <Option value="系统工具">系统工具</Option>
            <Option value="其他">其他</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="icon" hasFeedback>
          {getFieldDecorator('icon', {
               rules: [{
                required: true,
                message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={ beforeUpload }
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          )}
        </Form.Item>
        <Form.Item label="平台类型" hasFeedback>
          {getFieldDecorator('platform')(
            <Radio.Group onChange={this.onChange} value={this.state.value}>
             <Radio value='Andriod'>Andriod</Radio>
             <Radio value='IOS'>IOS</Radio>
           </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="应用包名">
          {getFieldDecorator('packageName', {
            rules: [{ required: true, message: '应用包名不能为空', whitespace: true }],
          })(<Input placeholder="请输入应用包名"/>)}
        </Form.Item>
        <Form.Item label="包签名">
          {getFieldDecorator('packageSign', {
            rules: [{ required: true, message: '包签名不能为空', whitespace: true }],
          })(<Input placeholder="请输入包签名"/>)}
        </Form.Item>
        <Form.Item label="安卓链接">
          {getFieldDecorator('androidLink')(<Input placeholder="请输入安卓链接"/>)}
        </Form.Item>
        <Form.Item label="应用简介">
          {getFieldDecorator('introduce', {
            rules: [{ required: true, message: '应用简介不能为空', whitespace: true }],
          })(  <TextArea
            placeholder="请输入应用简介"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />)}
        </Form.Item>
    
      </Form>
    )


  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render () {
    return (
      <div className="card-space">
        <ContnentUI renderDomFun={ this.renderDomFun } />
      </div>
    )
  }
}

const wrapperForm = Form.create({})(oneClickLoginAdd)

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapperForm)