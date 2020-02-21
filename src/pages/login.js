
import md5 from 'js-md5'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter  } from 'react-router'
import { Form, Button, Icon, Input,Row, Col } from 'antd'
import {
  doLoginAction,
  getVerifyCodeAction
} from '@/common/js/store/actionCreators'

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { uuid, doLoginAction } = this.props
        values.uuid = uuid
        values.pwd = md5(values.pwd)
        doLoginAction(values)
      }
    })
  }

  getVerifyCodeClick = () => {
    this.props.getVerifyCodeAction()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(

      <div className="login-wrapper">
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('account', {
          rules: [{ required: true, message: '请输入登录名' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('pwd', {
          rules: [{ required: true, message: '请输入密码' }],
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            suffix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Row>
          <Col span={11}>
            {getFieldDecorator('vcode', {
              rules: [{ required: true, message: '请输入验证码' }],
            })(
              <Input
                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="验证码"
              /> 
            )}
          </Col>
          <Col span={11} offset={2}>
            <img onClick = { this.getVerifyCodeClick } src ={`data:image/png;base64,${this.props.vcode}`}/>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
      </Form.Item>
    </Form>
    </div>
    )
  }

  componentDidMount() {
    this.props.getVerifyCodeAction()
  }
  shouldComponentUpdate(nextProps,nextState) {
    if(nextProps.confirmLand) {
      this.props.history.push({
        pathname: `/`
      })
    }
    return true
  }
}

// const Login = () => (
//   <div className="login-wrapper">
//     {/* <img src={reqiure("/public/assets/logo.png")}/> */}
//   </div>
// );
const LoginForm = Form.create({})(Login)
function mapStateToProps (state) {
  return { 
    uuid: state.getIn(['base', 'uuid']),
    vcode: state.getIn(['base', 'vcode']),
    confirmLand: state.getIn(['base', 'confirmLand']),
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    doLoginAction: (data) => dispatch(doLoginAction(data)),
    getVerifyCodeAction: () => dispatch(getVerifyCodeAction()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))