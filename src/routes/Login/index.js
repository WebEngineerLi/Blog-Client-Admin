// import { Checkbox, Input } from 'antd';
import React, { Component } from "react";
import CSSModules from "react-css-modules";
import { Form, Input, Icon, Button, Row, Col, notification } from "antd";
import { connect } from 'react-redux';
import styles from "./style.scss";
import { model, selectors } from '../../models/blog';
import Img from "../../images/pic_yy.png";
import generateCode from "./check_code";
const mapStateToProps = () => ({
})
const mapDisaptchToProps = (dispatch) => ({
  login(params, callback) {
    dispatch({
      type: `${model.namespace}/login`,
      payload: params,
      callback
    })
  },
})
@Form.create()
@connect(mapStateToProps, mapDisaptchToProps)
@CSSModules(styles)
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: ''
    }
  }

  componentDidMount() {
    const code = generateCode();
    this.setState({ code })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const { checkCodeInput } = values;
      const { code } = this.state;
      if (checkCodeInput !== code) {
        notification.error({
          message: '验证码不正确'
        })
        return;
      }
      const callback = ({ success }) => {
        if (success) {
          notification.success({
            message: '登录成功'
          })
          this.props.history.push('/article')
        }
      }
      this.props.login({
        username: values.username,
        password: values.password
      }, callback)
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div styleName="loginWrap">
        <div>
          <img src={Img} />
        </div>
        <div styleName="login">
          <div styleName="title">博客后台管理系统</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator("checkCodeInput", {
                    rules: [{ required: true, message: "请输入验证码!" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="验证码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <canvas
                  id="myCanvas"
                  width="100"
                  height="45"
                  onClick={() => {
                    const code = generateCode();
                    this.setState({ code })
                  }}
                ></canvas>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
